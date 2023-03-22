/**
 * @swagger
 * tags:
 *   name: Cohorts
 * /api/v1/cohorts:
 *   get:
 *     description: Returns a list of all cohorts
 *     tags: [Cohorts]
 *     parameters:
 *        - name: course
 *          type: string
 *          required: false
 *        - name: status
 *          type: string
 *          required: false
 *          examples: past, future, active
 *        - name: deleted
 *          type: boolean
 *          required: false
 *     responses:
 *       200:
 *         description: Provides an array of cohorts
 *       400:
 *         description: Error messages
 */

import Cohort from "lib/models/Cohort";
// import Course from "../../lib/models/Course";
// import Lesson from "../../lib/models/Lesson";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        //call method for getting cohorts with any parameters we received
        const cohorts = await getCohorts(req.query);
        res.status(200).json({ data: cohorts });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      }
      return;
    case "POST":
      return await createCohort();
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getCohorts = async (filters = {}) => {
  try {
    await dbConnect();

    //build mongo query using filters
    const mongoFilter = {};
    if (!!filters.status) {
      mongoFilter.status = filters.status;
    }

    if (!!filters.course) {
      mongoFilter.course = filters.course;
    }

    if (!!filters.deleted) {
      mongoFilter.deleted_at = { $ne: null };
    }

    //query mongo and return result
    const cohorts = await Cohort.find(mongoFilter)
      .populate("course", "_id course_name")
      .exec();
    return cohorts;
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};

const createCohort = async () => {
  throw new Error("WIP");
};
