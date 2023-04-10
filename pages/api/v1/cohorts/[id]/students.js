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
 *             type: array
 *             schema:
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
 *             type: array
 *             schema:
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
import User from 'lib/models/User'; // this import is needed for successful population
import Cohort from 'lib/models/Cohort';
import dbConnect from 'lib/dbConnect';
import { ObjectId } from 'bson';

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case 'GET':
      try {
        const data = await getCohortStudents(id);
        res.status(200).json({ data: data.students }); // returns an array of students (or empty array if there are no students in 'students' property) or null if cohort not found or has timestamp in property deleted_at
      } catch (error) {
        res
          .status(error.status || 400)
          .json({ message: error.message });
      }
      break;
    case 'PATCH':
      try {
        if (!req.body.students) {
          res
            .status(400)
            .json({ message: 'Student ids to add are not provided' });
        } else {
          // TODO - make sure calculating/updating 'seats' property is taken care  of in Cohort data model to prevent students from exceeding allowed number
          const updatedCohort = await addUsersToCohort(
            id,
            'students',
            req.body.students
          );
          const updatedCohortPopulate = await updatedCohort.populate(
            'students.user'
          );
          res.status(200).json({ data: updatedCohortPopulate.students });
        }
      } catch (error) {
        console.error(error);
        res
          .status(error.status || 400)
          .json({ message: error.message });
      }

      break;
    case 'DELETE':
      try {
        if (!req.body.students) {
          res
            .status(400)
            .json({ message: 'Student ids to delete are not provided' });
        } else {
          await deleteStudentsFromCohort(id, 'students', req.body.students);
          // NOTE - if need to return deleted cohort use - json({ data: deletedCohort })
          res.status(200).json();
        }
      } catch (error) {
        console.log(error);
        res
          .status(error.status || 400)
          .json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const getCohortStudents = async (id) => {
  await dbConnect();
  const data = await Cohort.findById(id, 'students')
    .populate('students.user')
    .exec(); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort) and only returns students with all fields from User data model
  if (!data) {
    //throw new Error(`Cohort with id of ${id} not found`);
    const error = new Error();
    error.status = 404;
    error.message = `Could not find cohort with id ${id} `;
    throw error;
  }
  return data;
};

export const addUsersToCohort = async (id, field, value) => {
  await dbConnect();
  const cohort = await Cohort.findById(id);
  if (!cohort) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find cohort with id ${id} `;
    throw error;
  }

  // find which of the provided users exist in users database
  const users = await User.find({ _id: { $in: value } });

  // add field if cohort has set it to null
  if (!cohort[field]) {
    cohort[field] = [];
  }

  users.forEach((user) => {
    // if the user not in the field already, add them
    const isExistingUser = cohort[field].find(
      (u) => u.user?.toString() === user._id.toString()
    );

    if (!isExistingUser) {
      // check if the field is 'student' to add 'added_at' property
      if (field === 'students') {
        cohort[field].push({ user: user._id, added_at: new Date() });
      } else {
        cohort[field].push({ user: user._id });
      }
    }
  });
  return await cohort.save();
};

export const deleteStudentsFromCohort = async (id, field, value) => {
  await dbConnect();
  try {
    const parsedValues = value.map((studentId) => ObjectId(studentId));

    const cohort = await Cohort.findByIdAndUpdate(
      { _id: id },
      { $pull: { [field]: { user: { $in: parsedValues } } } }
      //  { new: true }
    );
    if (!cohort) {
      const error = new Error();
      error.status = 404;
      error.message = `Could not find cohort with id ${id} `;
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
