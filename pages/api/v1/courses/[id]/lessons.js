/**
 * @swagger
 *  tags:
 *   name: Courses
 * /api/v1/courses/{id}/lessons:
 *   get:
 *     description: Returns all course's lessons by the courses's id
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
 *         description: Provides a courses's data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course or it's lessons not found ???
 *   put:
 *     description: Updates a course's lessons
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
 *         name: Lessons
 *         description: An object with array of lessons' mongodb ids
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             lessons:
 *               type: array
 *               schema:
 *                 type: array
 *                 items:
 *                   type: string
 *           example: { "lessons": ["62e26dc669dd077fc82fbffa", "62e26dc669dd077fc82fc00b"]}
 *     responses:
 *       200:
 *         description: Provides course's updated lessons
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course or it's lessons not found ????
 */

import Course from "lib/models/Course";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "GET":
      try {
        const data = await getLessons(id);
        res.status(200).json({ data: data.lessons });
      } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    // case "PATCH":
    //   try {
    //     const updatedCourse = await updateCourse(id, req.body);
    //     res.status(200).json({ data: updatedCourse });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(error.status || 400).json({ message: error.message });
    //   }
    //   break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getLessons = async (id) => {
  await dbConnect();
  const data = await Course.findById(id, "lessons").populate("lessons").exec();
  if (!data) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find course with id - ${id}`;
    throw error;
  }
  return data;
};

// export const updateCourse = async (id, updates) => {
//   // filter updates to extract allowed fields to perform update
//   const allowedFields = ["course_name", "lessons", "deleted_at"];
//   const filteredUpdates = allowedFields.reduce((fields, current) => {
//     if (current === "deleted_at" && updates[current] === null) {
//       return { ...fields, [current]: updates[current] };
//     } else if (current === "deleted_at" && updates[current]) {
//       // check if deleted_at is a Date not null and do not let the field to go to updates (deleted not allowed in PATCH)
//       return fields;
//     }
//     if (updates[current]) {
//       return { ...fields, [current]: updates[current] };
//     }
//     return fields;
//   }, {});

//   await dbConnect();
//   if (filteredUpdates.course_name) {
//     //make sure course_name is unique
//     const duplicateCourseName = await Course.findOne({
//       course_name: filteredUpdates.course_name,
//     });
//     if (duplicateCourseName) {
//       throw new Error("Duplicate Course Name");
//     }
//   }

//   // make sure provided lessons exist in db
//   if (filteredUpdates.lessons) {
//     // find which of the provided users exist in users database, if not - throw an error
//     const lessons = await Lesson.find({
//       _id: { $in: filteredUpdates.lessons },
//     });
//     if (lessons.length !== filteredUpdates.lessons.length) {
//       throw new Error("All lessons provided must exist in the data base");
//     }
//   }
//   // since an error is returned if filteredUpdates is an empty object because database won't perform an update with empty object provided, return error if there are no valid fields to update
//   if (Object.keys(filteredUpdates).length === 0) {
//     throw new Error(
//       "Valid data to perform an update for the course not provided"
//     );
//   } else {
//     const updatedCourse = await Course.findByIdAndUpdate(id, filteredUpdates, {
//       new: true,
//     });

//     //run mongoose validator to make sure data is valid (it will not check for name uniqueness)
//     const validationErr = await updatedCourse.validate();
//     if (validationErr) {
//       throw new Error(validationErr);
//     }

//     if (!updatedCourse) {
//       const error = new Error();
//       error.status = 404;
//       error.message = `Could not find and update course with id - ${id}`;
//       throw error;
//     }
//     const updatedCoursePopulate = await updatedCourse.populate("lessons");

//     return updatedCoursePopulate;
//   }
// };
