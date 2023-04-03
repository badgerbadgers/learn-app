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
  await dbConnect();
  switch (method) {
    case "PATCH":
      //check body for update field
      const updates = req.body;

      //Prevent changing cohort_name if it already exists
      const cohortNameExists = await Cohort.findOne({
        cohort_name: updates.cohort_name,
      });

      if (cohortNameExists) {
        return res.status(400).json({ message: "Cohort name already exists" });
      }
      if (Object.keys(updates).length > 0) {
        //handle slug
        if ("cohort_name" in updates) {
          updates.slug = updates.cohort_name
            .trim()
            .replaceAll(" ", "-")
            .toLowerCase();
        }
        //update
        try {
          await Cohort.updateOne({ _id: id }, updates);
        } catch (error) {
          console.error("Update cohort error", error);
          res.status(400).json({ success: false });
          return;
        }
      }

      res.status(200).json({ success: true });
      return;
      break;
  }
}
