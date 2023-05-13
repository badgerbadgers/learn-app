// TODO check 4** error responses options
/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}/students:
 *   get:
 *     description: Returns a cohort's students by the cohort's id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62db592a4101934c0011b357
 *     responses:
 *       200:
 *         description: Provides a cohort's students list
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's students not found
 *   patch:
 *     description: Updates a cohort's students list by the cohort's id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Cohort id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62db592a4101934c0011b357
 *       - in: body
 *         name: students
 *         description: An object with property 'students' and a value of array of students' mongo ids to add
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - students
 *           properties:
 *             students:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"students": ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]}
 *     responses:
 *       200:
 *         description: Provides a cohort's students list
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's students not found
 *   delete:
 *     description: Deletes students from a cohort by cohort's id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         description: Cohort id
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 635841bd9be844015c74719a
 *       - in: body
 *         name: students
 *         description: An object with property 'students' and a value of array of students' mongo ids to delete
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - students
 *           properties:
 *             students:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"students": ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]}
 *     responses:
 *       200:
 *         description: Deletes a cohort's students by the cohort's id, returns no content
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's students not found
 */

// TODO - swagger - change description if anything returns from DELETED request
import User from "lib/models/User"; // this import is needed for successful population
import Cohort from "lib/models/Cohort";
import dbConnect from "lib/dbConnect";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  try {
    switch (method) {
      case "GET":
        const students = await getCohortStudents(id);
        if (!students) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find cohort with id ${id} `;
          throw error;
        }
        res.status(200).json({ data: students }); // returns an array of students (or empty array if there are no students in 'students' property) or null if cohort not found or has timestamp in property deleted_at
        break;
      case "PATCH":
        if (!req.body.students) {
          res
            .status(400)
            .json({ message: "Student ids to add are not provided" });
        } else {
          const students = await addUsersToCohort(id, req.body);
          if (!students) {
            const error = new Error();
            error.status = 404;
            error.message = `Could not find cohort with id ${id} `;
            throw error;
          }

          res.status(200).json({ data: students });
        }
        break;
      case "DELETE":
        if (!req.body.students) {
          res
            .status(400)
            .json({ message: "Student ids to delete are not provided" });
        } else {
          const response = await deleteStudentsFromCohort(
            id,
            "students",
            req.body.students
          );
          // if delete was successful undefined is returned, check it it is null (not successful)
          if (response === null) {
            const error = new Error();
            error.status = 404;
            error.message = `Could not find cohort with id ${id} `;
            throw error;
          }
          res.status(200).json();
        }
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

const parseStudents = (students) =>
  students
    ?.map((student) => {
      if (student.user) {
        const filteredStudent = {
          id: student.user._id,
          ...student.user._doc,
          added_at: student.added_at || null,
        };
        delete filteredStudent._id;
        return filteredStudent;
      }
    })
    .filter((student) => student) || []; // filter to get students which are not deleted (not null) and return empty array if no active students found

export const getCohortStudents = async (id) => {
  await dbConnect();
  const cohort = await Cohort.findById(id, "students").populate(
    "students.user"
  ); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort) and only returns students with all fields from User data model and added_at property
  if (!cohort) {
    return null;
  }
  return parseStudents(cohort.students);
};

export const addUsersToCohort = async (id, updates) => {
  await dbConnect();
  const cohort = await Cohort.findById(id);
  if (!cohort) {
    return null;
  }
  await cohort.updateStudents(updates.students);
  await cohort.save();
  const updatedCohortPopulate = await cohort.populate("students.user");
  return parseStudents(updatedCohortPopulate.students);
};

export const deleteStudentsFromCohort = async (id, field, value) => {
  await dbConnect();
  const parsedValues = value.map((studentId) => ObjectId(studentId));
  const cohort = await Cohort.findByIdAndUpdate(
    { _id: id },
    { $pull: { [field]: { user: { $in: parsedValues } } } }
  );
  if (!cohort) {
    return null;
  }
};
