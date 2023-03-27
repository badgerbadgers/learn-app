/**
 * @swagger
 * tags:
 *   name: Cohorts
 * /api/v1/cohorts/[id]

 *   patch:
 *     description: Change cohort name
 *     tags: [Cohorts]
 * parameters:
 *        - name: cohort_name
 *          type: string
 *          required: true
 *     responses:
 *       200:
 *         description: the created cohort
 *       400:
 *         description: Error messages
 */
import Cohort from "lib/models/Cohort";
import Course from "lib/models/Course";
import Lesson from "lib/models/Lesson";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "PATCH":
      //check body for update field
      const updates = req.body;

      //first remove any keys that are not allowed to be updated
      const allowedFields = ["schedule", "start_date", "cohort_name"];
      for (const key in updates) {
        if (allowedFields.indexOf(key) === -1) {
          delete updates[key];
        }
      }

      //go over keys in update object
      //if there are updates to students and or mentors, handle them first and seperately

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
