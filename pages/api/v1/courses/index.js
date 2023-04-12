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
 *
 *           example: {"course_name": "React-Redux", "lessons": ["62e26dbb69dd077fc82fbfe5", "62e26dbb69dd077fc82fbfe1"]}
 *     responses:
 *       200:
 *         description: Provides a newly created Course details
 *       400:
 *         description: Error messages
 */

import Course from "lib/models/Course";
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
        //call method for creating a cohort with any data we received
        // const cohort = await createCohort(req.body);
        res.status(200).json({ data: "course" });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      }
    // case 'DELETE':
    //   try {
    //     const deletedCohort = await deleteCohortById(id);
    //     if (!deletedCohort) {
    //       res.status(404).json({
    //         message: `Failed to delete cohort with id ${id}. Cohort not found`,
    //       });
    //       return;
    //     } else {
    //       // NOTE - if need to return deleted cohort, use - json({ data: deletedCohort })
    //       res.status(200).json();
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(error.status || 400).json({ message: error.message }); // TODO  - should it display actual error message we get or should it be hard coded text?
    //   }
    //   break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const getCourses = async (deleted) => {
  try {
    await dbConnect();
    let courses = [];
    if (deleted === "true") {
      courses = await Course.find({ deleted_at: { $ne: null } });
    } else {
      courses = await Course.find({ deleted_at: { $eq: null } });
    }
    return courses;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

// export const createCohort = async (data) => {
//   //do not let user overwrite schedule, students, and mentors
//   delete data.schedule;
//   data.mentors = [];
//   data.students = [];

//   //run mongoose validator to make sure data is ok (it will not check for name uniqueness)
//   const newCohort = new Cohort(data);
//   const validationErr = await newCohort.validate();
//   if (validationErr) {
//     throw new Error(validationErr);
//   }

//   await dbConnect();

//   //make sure cohort_name is unique
//   const duplicateNameCohort = await Cohort.findOne({
//     cohort_name: newCohort.cohort_name,
//   });
//   if (duplicateNameCohort) {
//     throw new Error('Duplicate Cohort Name');
//   }

//   //copy schedule from course
//   newCohort.schedule = await createSchedule(newCohort.course);

//   //save the new cohort
//   await newCohort.save();

//   return newCohort;
// };

// // export const deleteCohortById = async (id) => {
// //   try {
// //     await dbConnect();
// //     const deletedCohort = await Cohort.findByIdAndUpdate(id, {
// //       deleted_at: new Date(),
// //     }); // TODO - add { new: true } if need to return deleted cohort in response
// //     return deletedCohort;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error(error);
// //   }
// // };
