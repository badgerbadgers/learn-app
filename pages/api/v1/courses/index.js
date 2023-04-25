/**
 * @swagger
 *  tags:
 *   name: Courses
 * /api/v1/courses:
 *   get:
 *     description: Returns all deleted or not deleted courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: deleted
 *         schema:
 *           type: boolean
 *         required: false
 *         example: false
 *     responses:
 *       200:
 *         description: Provides list of courses
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error messages if courses not found
 *   post:
 *     description: Creates a new Course
 *     tags: [Courses]
 *     parameters:
 *       - in: body
 *         name: new course
 *         description: An object with required properties to create a new course
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - course_name
 *           properties:
 *             course_name:
 *               type: string
 *             lessons:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"course_name": "React-Redux", "lessons": ["62e26dbb69dd077fc82fbfe5", "62e26dbb69dd077fc82fbfe1"]}
 *     responses:
 *       200:
 *         description: Provides a newly created Course details
 *       400:
 *         description: Error messages
 */

import Course from "lib/models/Course";
import Lesson from "lib/models/Lesson";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const deleted = req.query.deleted || false;

  switch (method) {
    case "GET":
      try {
        const courses = await getCourses(deleted);
        if (!courses) {
          res.status(404).json({ message: `Failed to find courses` });
        } else {
          res.status(200).json({ data: courses });
        }
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        //call method for creating a course with any data we received
        const course = await createCourse(req.body);
        res.status(200).json({ data: course });
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const getCourses = async (deleted) => {
  await dbConnect();
  let courses = [];
  if (deleted === "true") {
    courses = await Course.find({ deleted_at: { $ne: null } });
  } else {
    courses = await Course.find(); // returns only not deleted courses
  }
  return courses;
};

export const createCourse = async (data) => {
  //do not let user create slug
  if (data.slug) {
    delete data.slug;
  }
  //do not let user create a course with deleted_at set to not null
  if (data.deleted_at) {
    // delete data.deleted_at;
    throw new Error("Cannot create deleted Course");
  }
  if (data.deleted_at === null) {
    delete data.deleted_at;
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Valid data to create a new course not provided");
  }

  await dbConnect();
  if (data.course_name) {
    //make sure course_name is unique
    const duplicateCourseName = await Course.findOne({
      course_name: data.course_name,
    });

    if (duplicateCourseName) {
      throw new Error("Duplicate Course Name");
    }
  }

  // make sure provided lessons exist in db
  if (data.lessons) {
    // find which of the provided users exist in users database
    const lessons = await Lesson.find({ _id: { $in: data.lessons } }, "_id");
  
    // throw an error if not each lesson id provided is found in db
    if (!lessons) {
      throw new Error("All lessons ids provided must exist in the data base");
    }
    if (lessons) {
      // check if each provided lesson exist in db
      const ifEveryExist = data.lessons.every((lesson) =>
        lessons.find((lsn) => lsn._id.toString() === lesson)
      );
      // throw an error if not each lesson id provided is found in db
      if (!ifEveryExist) {
        throw new Error("All lessons ids provided must exist in the data base");
      }
      // make sure to not add duplicate lessons
      data.lessons = lessons
    }
  }

  const newCourse = new Course(data);
  //run mongoose validator to make sure data is valid (it will not check for name uniqueness)
  const validationErr = await newCourse.validate();
  if (validationErr) {
    throw new Error(validationErr);
  }

  //save the new course
  await newCourse.save();
  const newCoursePopulate = await newCourse.populate("lessons");
  return newCoursePopulate;
};
