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
 *         example: 635841bd9be844015c74719a
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
 *         example: 635841bd9be844015c74719a
 *       - in: body
 *         description: Array of students' mongo ids
 *         name: students
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]
 *     required: true
 *     responses:
 *       200:
 *         description: Provides a cohort's students list
 *       400:
 *         description: Error messages
 *   delete:
 *     description: Deletes a students from a cohort by cohort's id
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
 *         description: Array of students' mongo ids
 *         name: students
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           required: true
 *           example: ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]
 *     responses:
 *       200:
 *         description: Deletes a cohort's students by the cohort's id, returns no content (???)
 *       400:
 *         description: Error messages
 */

// TODO - swagger - change description if anything returns from DELETED request
import User from 'lib/models/User'; // this import is needed for successful population
import Cohort from 'lib/models/Cohort';
import dbConnect from 'lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const data = await getCohortStudents(id);

        res.status(200).json({ data: data.students }); // returns an array of students (or empty array if there are no students in 'students' property) or null if cohort not found or has timestamp in property deleted_at
      } catch (error) {
        res.status(error.code || 400).json({ message: error.message });
      }
      break;
    case 'PATCH':
      const { students } = req.body;
      try {
        const updatedCohort = await addUsersToCohort(id, 'students', students);
        const updatedCohortPopulate = await updatedCohort.populate(
          'students.user'
        );
        res.status(200).json({ data: updatedCohortPopulate.students });
      } catch (error) {
        console.error(error);
        res.status(error.code || 400).json({ message: error.message });
      }
      break;
    case 'DELETE':
      //   try {
      //     const deletedCohort = await Cohort.findByIdAndUpdate(id, {
      //       deleted_at: new Date(),
      //     }); // TODO - add { new: true } if need to return deleted cohort in response
      //     console.log(deletedCohort)
      //     if (!deletedCohort) {
      //       res.status(404).json({
      //         message: `Failed to delete cohort with id ${id}. Cohort not found`,
      //       });
      //       return;
      //     }
      //     // NOTE - if need to return deleted cohort use - json({ data: deletedCohort })
      //     // 204 (No Content)
      //     res.status(204).json({ success: true });
      //   } catch (error) {
      //     console.log(error)
      //     res.status(400).json({ message: error.message });
      //   }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const getCohortStudents = async (id) => {
  const data = await Cohort.findById(id, 'students')
    .populate('students.user')
    .exec(); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort) and only returns students with all fields from User data model
  if (!data) {
    //throw new Error(`Cohort with id of ${id} not found`);
    const error = new Error();
    error.code = 404;
    error.message = `Could not find cohort with id ${id} `;
    throw error;
  }
  return data;
};

const addUsersToCohort = async (id, field, value) => {
  const cohort = await Cohort.findById(id);
  if (!cohort) {
    //throw new Error(`Cohort with id of ${id} not found`); 
    const error = new Error();
    error.code = 404;
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
