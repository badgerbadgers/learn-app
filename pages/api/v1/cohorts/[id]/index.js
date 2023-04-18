/**
 * @swagger
 * tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}:
*   patch:
*     description: Update cohort fields
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
import Cohort from "lib/models/Cohort";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  const updates = req.body;
  await dbConnect();
  switch (method) {
    case "PATCH":
      try {
        await updateCohort(id, updates);
        res.status(200).json({ data: updates });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const updateCohort = async (id, updates) => {
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
  } else {
    const updatedCohort = await Cohort.findByIdAndUpdate(id, updates, {
      new: true,
    });
    //run mongoose validator to make sure data is valid
    const validationErr = await updatedCohort.validate();
    if (validationErr) {
      throw new Error(validationErr);
    }

    if (!updatedCohort) {
      const error = new Error();
      error.status = 404;
      error.message = `Could not find and update cohort with id - ${id}`;
      throw error;
    }

  }
}