// /**
//  * @swagger
//  * tags:
//  *   name: Cohorts 
//  * /api/cohorts:
//  *   get:
//  *     description: Returns all cohorts
//  *     tags: [Cohorts] 
//  *     responses:
//  *       200:
//  *         description: Get cohorts
//  *   post:
//  *     description: Create the cohort
//  *     tags: [Cohorts]
//  *     responses:
//  *       200:
//  *         description: Create the cohort
//  */
const { ObjectId } = require("mongodb");

import Cohort from "../../lib/models/Cohort";
import Course from "../../lib/models/Course";
import Lesson from "../../lib/models/Lesson";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      return await getCohorts(req, res);
    case "POST":
      return await createCohort(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getCohorts = async (req, res) => {
  let cohorts = [];
  try {
    cohorts = await Cohort.find({})
      .populate("course", "_id course_name")
      .exec();
    res.status(200).json({ success: true, data: JSON.stringify(cohorts) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
  return res;
};

const createCohort = async (req, res) => {
  try {
    const cohortToDb = await sanitize(JSON.parse(req.body.body));
    const existingCohortName = await Cohort.findOne({
      cohort_name: cohortToDb.cohort_name,
    });
    if (existingCohortName) {
      const error = {
        error: "This cohort name is already in use",
      };
      res.status(400).json({
        success: false,
        message: error,
      });
      return;
    }
    const courseError = {
      error: "Please select a course",
    };
    if (!cohortToDb.course) {
      res.status(400).json({
        success: false,
        message: courseError,
      });
      return;
    }
    const checkCourseId = await Course.findOne({
      _id: cohortToDb.course,
    });
    if (!checkCourseId) {
      res.status(400).json({
        success: false,
        message: courseError,
      });
      return;
    }
    cohortToDb.schedule = await createSchedule(cohortToDb.course);
    const cohort = await Cohort.create(cohortToDb);
    if (!cohort) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: cohort });
  } catch (error) {
    console.log(error);
    const errors = {};
    Object.entries(error.errors).forEach(([k, v]) => {
      errors[k] = v.message;
    });

    return res.status(400).json({
      success: false,
      message: errors,
    });
  }
  return res;
};

export const sanitize = async (obj) => {
  return {
    cohort_name: obj.cohortName,
    course: obj.courseName ? ObjectId(obj.courseName) : null,
    start_date: obj.startDate ? new Date(obj.startDate) : null,
    seats: obj.seats || 0,
    slug: obj.cohortName.trim().replaceAll(" ", "-").toLowerCase(),
    created_at: obj.created_at ? obj.created_at : new Date(),
  };
};

export const createSchedule = async (courseId) => {
  let schedule = [];
  try {
    let lessonsInCourse = await Course.findOne(
      {
        _id: courseId,
      },
      "lessons"
    );
    lessonsInCourse = lessonsInCourse.lessons;
    const sortedLessons = await Lesson.find({ _id: { $in: lessonsInCourse } })
      .select({ _id: 1, order: 1, section: 1 })
      .sort({ order: 1 });
    sortedLessons.map((l) =>
      schedule.push({
        lesson: l._id,
        type: "lesson",
        section: l.section,
      })
    );
  } catch (error) {
    console.log(error, "Can't fetch lessons from course");
  }

  return schedule;
};
