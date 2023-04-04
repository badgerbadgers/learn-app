/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}/mentors:
 *   get:
 *     description: Returns a cohort's mentors by the cohort's id
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
 *         description: Provides a cohort's mentors list
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's mentors not found
 *   patch:
 *     description: Updates a cohort's mentors list by the cohort's id
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
 *         name: mentors
 *         description: An object with property 'mentor' and a value of array of mentors' mongo ids
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - mentors
 *           properties:
 *             mentors:
 *             type: array
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"mentors": ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]}
 *     responses:
 *       200:
 *         description: Provides a cohort's mentors list
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's mentors not found
 *   delete:
 *     description: Deletes mentors from a cohort by cohort's id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         description: Cohort id
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62db592a4101934c0011b357
 *       - in: body
 *         name: mentors
 *         description: An object with property 'mentor' and a value of array of mentors' mongo ids to be deleted
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - mentors
 *           properties:
 *             mentors:
 *             type: array
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"mentors": ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]}
 *     responses:
 *       204:
 *         description: Deletes a cohort's mentors by the cohort's id, returns no content
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's mentors not found
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
        const data = await getCohortMentors(id);
        res.status(200).json({ data: data.mentors }); // returns an array of mentors (or empty array if there are no mentors in 'mentors' property) or null if cohort not found or has a timestamp in property deleted_at
      } catch (error) {
        res
          .status(error.code || error.status || 400)
          .json({ message: error.message });
      }
      break;
    case 'PATCH':
      try {
        if (!req.body.mentors) {
          res
            .status(400)
            .json({ message: 'Mentor ids to add are not provided' });
        } else {
          const updatedCohort = await addUsersToCohort(
            id,
            'mentors',
            req.body.mentors
          );
          const updatedCohortPopulate = await updatedCohort.populate(
            'mentors.user'
          );
          res.status(200).json({ data: updatedCohortPopulate.mentors });
        }
      } catch (error) {
        console.error(error);
        res
          .status(error.code || error.status || 400)
          .json({ message: error.message });
      }

      break;
    case 'DELETE':
      try {
        if (!req.body.mentors) {
          res
            .status(400)
            .json({ message: 'Mentors ids to delete are not provided' });
        } else {
          await deleteMentorsFromCohort(id, 'mentors', req.body.mentors);
          // NOTE - if need to return deleted cohort use - json({ data: deletedCohort })
          // 204 (No Content)
          res.status(204).json();
        }
      } catch (error) {
        console.log(error);
        res
          .status(error.status || error.code || 400)
          .json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const getCohortMentors = async (id) => {
  await dbConnect();
  const data = await Cohort.findById(id, 'mentors')
    .populate('mentors.user')
    .exec(); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort) and only returns mentors with all fields from User data model
  if (!data) {
    //throw new Error(`Cohort with id of ${id} not found`);
    const error = new Error();
    error.code = 404;
    error.message = `Could not find cohort with id ${id} `;
    throw error;
  }
  return data;
};

export const addUsersToCohort = async (id, field, value) => {
  await dbConnect();
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

  // if students property equals to null adding users will give an error
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

export const deleteMentorsFromCohort = async (id, field, value) => {
  await dbConnect();

  try {
    const parsedValues = value.map((mentorId) => ObjectId(mentorId));

    const cohort = await Cohort.findByIdAndUpdate(
      { _id: id },
      { $pull: { [field]: { user: { $in: parsedValues } } } }
      //  { new: true }
    );

    if (!cohort) {
      const error = new Error();
      error.code = 404;
      error.message = `Could not find cohort with id ${id} `;
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
