/**
 * @swagger
 * tags:
 *   name: Cohorts
 * /api/v1/cohorts:
 *   get:
 *     description: Returns a list of all cohorts
 *     tags: [Cohorts]
 *     parameters:
 *        - name: course
 *          type: string
 *          required: false
 *        - name: status
 *          type: string
 *          required: false
 *          example: past, future, active
 *        - name: deleted
 *          type: boolean
 *          required: false
 *     responses:
 *       200:
 *         description: Provides an array of cohorts
 *       400:
 *         description: Error messages
 *   post:
 *     description: Creates a new cohort
 *     tags: [Cohorts]
 *     parameters:
 *        - name: cohort_name
 *          type: string
 *          required: true
 *        - name: course
 *          type: string
 *          required: true
 *        - name: start_date
 *          type: date
 *          required: false
 *        - name: zoom_link
 *          type: string
 *          required: false
 *        - name: seats
 *          type: int
 *          required: false 
 *     responses:
 *       200:
 *         description: the created cohort
 *       400:
 *         description: Error messages
 */

import Cohort from "lib/models/Cohort";
import Course from "lib/models/Course";
import Lesson from "lib/models/Lesson";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        //call method for getting cohorts with any parameters we received
        const cohorts = await getCohorts(req.query);
        res.status(200).json({ data: cohorts });
      } catch (error) {
        // console.error(error);
        res.status(400).json({ message: error.message });
      }
      return;
    case "POST":
      try {
        //call method for creating a cohort with any data we received
        const cohort = await createCohort(req.body);
        res.status(200).json({ data: cohort });
      } catch (error) {
        // console.error(error);
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getCohorts = async (filters = {}) => {
  try {
    await dbConnect();

    //build mongo query using filters
    const mongoFilter = {};
    if (!!filters.status) {
      mongoFilter.status = filters.status;
    }

    if (!!filters.course) {
      mongoFilter.course = filters.course;
    }

    if (!!filters.deleted) {
      mongoFilter.deleted_at = { $ne: null };
    }

    //query mongo and return result
    const cohorts = await Cohort.find(mongoFilter)
      .populate("course", "_id course_name")
      .exec();
    return cohorts;
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};

export const createCohort = async (data) => {
  //do not let user overwrite schedule, students, and mentors
  delete data.schedule;
  data.mentors = [];
  data.students = [];

  //run mongoose validator to make sure data is ok (it will not check for name uniqueness)
  const newCohort = new Cohort(data);
  const validationErr = await newCohort.validate();
  if (validationErr) {
    throw new Error(validationErr);
  }

  await dbConnect();

  //make sure cohort_name is unique
  const duplicateNameCohort = await Cohort.findOne({
    cohort_name: newCohort.cohort_name,
  });
  if (duplicateNameCohort) {
    throw new Error("Duplicate Cohort Name");
  }

  //copy schedule from course
  newCohort.schedule = await createSchedule(newCohort.course);

  //save the new cohort
  await newCohort.save();

  return newCohort;
};

//TODO: do we want to refactor this so it will throw an error with any problem with the schedule?
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
    throw new Error("Can't fetch lessons from course");
  }

  return schedule;
};