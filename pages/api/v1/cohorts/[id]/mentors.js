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
 *               type: array
 *               items:
 *                 type: string
 *           example: {"mentors": ["62a11039db71825ea1c4388f", "634dbf456cef142cec41c17e"]}
 *     responses:
 *       200:
 *         description: Deletes a cohort's mentors by the cohort's id, returns no content
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort or it's mentors not found
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
        const data = await getCohortMentors(id);
        if (!data) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find cohort with id ${id} `;
          throw error;
        }
        res.status(200).json({ data: data.mentors }); // returns an array of mentors (or empty array if there are no mentors in 'mentors' property) or null if cohort not found or has a timestamp in property deleted_at
        break;
      case "PATCH":
        if (!req.body.mentors) {
          const error = new Error();
          error.status = 400;
          error.message = `Mentor ids to add are not provided`;
          throw error;
        } else {
          const updatedCohort = await addUsersToCohort(id, req.body);
          if (!updatedCohort) {
            const error = new Error();
            error.status = 404;
            error.message = `Could not find cohort with id ${id} `;
            throw error;
          }
          res.status(200).json({ data: updatedCohort.mentors });
        }
        break;
      case "DELETE":
        if (!req.body.mentors) {
          const error = new Error();
          error.status = 400;
          error.message = `Mentors ids to delete are not provided`;
          throw error;
        } else {
          const cohort = await deleteMentorsFromCohort(
            id,
            "mentors",
            req.body.mentors
          );

          if (!cohort) {
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

export const getCohortMentors = async (id) => {
  await dbConnect();
  const data = await Cohort.findById(id, "mentors")
    .populate("mentors.user")
    .exec(); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort) and only returns mentors with all fields from User data model
  if (!data) {
    return null;
  }
  return data;
};

export const addUsersToCohort = async (id, updates) => {
  await dbConnect();
  const cohort = await Cohort.findById(id);
  if (!cohort) {
    return null;
  }
  await cohort.updateMentors(updates.mentors);
  await cohort.save();
  const updatedCohortPopulate = await cohort.populate("mentors.user");
  return updatedCohortPopulate;
};

export const deleteMentorsFromCohort = async (id, field, value) => {
  await dbConnect();

  const parsedValues = value.map((mentorId) => ObjectId(mentorId));

  const cohort = await Cohort.findByIdAndUpdate(
    { _id: id },
    { $pull: { [field]: { user: { $in: parsedValues } } } }
    //  { new: true }
  );

  if (!cohort) {
    return null;
  }
  return cohort;
};
