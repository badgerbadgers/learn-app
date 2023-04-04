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
      return;
    default: //PUT method will be added later
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
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
