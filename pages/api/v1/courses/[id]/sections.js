/**
 * @swagger
 *  tags:
 *   name: Courses
 * /api/v1/courses/{id}/sections:
 *   get:
 *     description: Returns all course's sections by the course's id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Course id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e056cee6daad619e5cc2c3
 *     responses:
 *       200:
 *         description: Provides a course's sections
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course not found
 *   post:
 *     description: Creates a section for the course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Course id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e056cee6daad619e5cc2c3
 *       - in: body
 *         name: Section
 *         description: An object with new section data
 *         required: true
 *         schema:
 *           type: object
 *           required: [title, course]
 *           properties:
 *             title:
 *               type: string
 *             course:
 *               type: string
 *             order:
 *               type: number
 *           example: { "title": "React Hooks", "order": 3, "course": "62e056cee6daad619e5cc2c3"}
 *     responses:
 *       200:
 *         description: Provides created section data
 *       400:
 *         description: Error messages
 */
import Lesson from "lib/models/Lesson";
import Course from "lib/models/Course";
import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "GET":
      try {
        const data = await getSections(id);
        res.status(200).json({ data });
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    // case "PUT":
    //   try {
    //     const updatedCourse = await updateLessons(id, req.body);
    //     res.status(200).json({ data: updatedCourse.lessons });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(error.status || 400).json({ message: error.message });
    //   }
    //   break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getSections = async (id) => {
  await dbConnect();
  const course = await Course.findById(id);
  if (!course) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find course with id - ${id}`;
    throw error;
  }
  const data = await Section.find({ course: id }).populate("course").exec();

  return data;
};

// export const updateLessons = async (id, updates) => {
//   // return error if lessons ids array is not provided in updates
//   if (
//     !Object.keys(updates).length ||
//     !updates.lessons ||
//     !updates.lessons.length
//   ) {
//     throw new Error(
//       "Lessons ids to perform an update for the course not provided"
//     );
//   }

//   await dbConnect();

//   // make sure provided lessons exist in db and create a list of non duplicated lessons ids
//   const lessons = await Lesson.find(
//     {
//       _id: { $in: updates.lessons },
//     },
//     "_id"
//   );
//   // throw an error if not each lesson id provided is found in db
//   if (!lessons) {
//     throw new Error("All lessons ids provided must exist in the data base");
//   }

//   // check if each provided lesson exist in db
//   const ifEveryExist = updates.lessons.every((lesson) =>
//     lessons.find((lsn) => lsn._id.toString() === lesson)
//   );
//   // throw an error if not each lesson id provided is found in db
//   if (!ifEveryExist) {
//     throw new Error("All lessons ids provided must exist in the data base");
//   }
//   // make sure to not add duplicate lessons
//   updates.lessons = lessons;

//   // update course
//   const updatedCourse = await Course.findByIdAndUpdate(
//     id,
//     { $set: { lessons: updates.lessons } },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   if (!updatedCourse) {
//     const error = new Error();
//     error.status = 404;
//     error.message = `Could not find and update course with id - ${id}`;
//     throw error;
//   }

//   const updatedCoursePopulate = await updatedCourse.populate("lessons");

//   return updatedCoursePopulate;
// };
