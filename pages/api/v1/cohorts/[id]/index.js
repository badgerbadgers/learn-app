// TODO check 4** error responses options
/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}:
 *   get:
 *     description: Returns a cohort data by id
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
 *         description: Provides a cohort data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error messages if cohort not found
 *   delete:
 *     description: Delete a cohort by id
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
 *         description: Deletes cohort by id, returns no content
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error messages if cohort to be deleted not found
 *   patch:
 *     description: Update allowed cohort fields ["cohort_name", "start_date", "seats", "zoom_link"]
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
 *         description: Cohort data to update
 *         name: cohort
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cohort_name:
 *               type: string
 *             start_date:
 *               type: string
 *               format: date-time
 *               example: 2025-04-04T04:00:00.000+00:00
 *             zoom_link:
 *               type: string
 *               example: https://us02web.zoom.us/j/87054407958
 *             seats:
 *               type: number
 *               example: 100
 *     responses:
 *       200:
 *         description: Updated cohort fields
 *       400:
 *         description: Error messages
 */

// TODO - swagger - change description if anything returns from DELETED request
// TODO  - add populate for students and mentors:
/*
 .populate({
      path: "students",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .populate({
      path: "mentors",
      populate: {
        path: "user",
        model: "User",
      },
    })

*/
import Cohort from "lib/models/Cohort";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  try {
    switch (method) {
      case "GET":
        const cohort = await getCohortById(id);
        if (!cohort) {
          const error = new Error();
          error.status = 404;
          error.message = `Failed to find cohort with id ${id}`;
          throw error;
        }
        res.status(200).json({ data: cohort });
        return;

      case "DELETE":
        const deletedCohort = await deleteCohortById(id);
        if (!deletedCohort) {
          const error = new Error();
          error.status = 404;
          error.message = `Failed to delete cohort with id ${id}. Cohort not found`;
          throw error;
        }
        res.status(200).json();
        // NOTE - if need to return deleted cohort, use - json({ data: deletedCohort })
        return;

      case "PATCH":
        const updates = req.body;
        const updatedCohort = await updateCohort(id, updates);
        if (!updatedCohort) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find and update cohort with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data: updatedCohort });
        return;

      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getCohortById = async (id) => {
  await dbConnect();
  const cohort = await Cohort.findById(id).exec(); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort)

  return cohort;
};

export const deleteCohortById = async (id) => {
  await dbConnect();
  const deletedCohort = await Cohort.findByIdAndUpdate(id, {
    deleted_at: new Date(),
  }); // TODO - add { new: true } if need to return deleted cohort in response
  return deletedCohort;
};

export const updateCohort = async (id, updates) => {
  await dbConnect();

  //first remove any keys that are not allowed to be updated
  const allowedFields = ["cohort_name", "start_date", "seats", "zoom_link"];

  for (const key in updates) {
    if (allowedFields.indexOf(key) === -1) {
      throw new Error(`Update ${key} is Not Allowed`);
    }
  }
  //Prevent changing cohort_name if it already exists
  const cohortNameExists = await Cohort.findOne({
    cohort_name: updates.cohort_name,
  });

  if (cohortNameExists) {
    throw new Error("Cohort name already exists");
  }
  if (Object.keys(updates).length === 0) {
    throw new Error("No valid information was supplied to update the cohort");
  }
  const updatedCohort = await Cohort.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return updatedCohort;
};
