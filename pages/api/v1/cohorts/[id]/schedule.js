/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}/schedule:
 *   get:
 *     description: Get schedule for a specific cohort
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
 *         description: Provides a cohort's schedule list
 *       400:
 *         description: Error messages
 *   put:
 *     description: Update entire schedule for specific cohort
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 635841bd9be844015c74719a
 *       - in: body
 *         name: schedule
 *         description:  
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - schedule
 *           properties:
 *             schedule:
 *             type: array
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"schedule": [
      {
        "lesson": "62e26dbb69dd077fc82fbfe5",
        "section": "633d9915ec0d4b5e83a6b05e"
      },
      {
        "lesson": "62e26dbb69dd077fc82fbfe1",
        "section": "633d9915ec0d4b5e83a6b05e"
      }]}
 *     responses:
 *       200:
 *         description: Update entire schedule for a specific cohort
 *       400:
 *         description: Error messages
 */

import Cohort from "lib/models/Cohort";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "GET":
      try {
        //Get a schedule for a specific cohort
        const schedule = await getCohortSchedule(id);
        res.status(200).json({ data: schedule });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "PUT":
      //check body for update object
      const updates = req.body;
      //update
      try {
        await dbConnect();
        await Cohort.updateOne({ _id: id }, updates);
      } catch (error) {
        console.error("Update cohort error", error);
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(200).json({ success: true, data: updates });
      return;
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
  return res;
}
export const getCohortSchedule = async (id) => {
  try {
    await dbConnect();
    const schedule = await Cohort.findById(id, "schedule")
      .populate("schedule.lesson") //we are getting lessons array
      .exec();
    //if wrong id then throw error
    if (!schedule) {
      Error(message);
    }
    return schedule;
  } catch (error) {
    throw new Error(`Cohort with id ${id} not found`);
  }
};
