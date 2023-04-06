/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}/status:
 *   patch:
 *     description: Updates a cohort's status by id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Cohort id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62db592a4101934c0011b357
 *     responses:
 *       200:
 *         description: Provides given cohort's status
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort is not found
 */

import Cohort from 'lib/models/Cohort';
import dbConnect from 'lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  if (method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  try {
    const data = await updateCohortStatus(id);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res
      .status(error.code || error.status || 400)
      .json({ error: error.message });
  }
}

export const updateCohortStatus = async (id) => {
  try {
    await dbConnect();
    const cohort = await Cohort.findById(id);
    if (!cohort) {
      //throw new Error(`Cohort with id of ${id} not found`);
      const error = new Error();
      error.code = 404;
      error.message = `Could not find cohort with id ${id} `;
      throw error;
    }
    await cohort.save();
    return { status: cohort.status };
  } catch (error) {
    throw new Error(error.message);
  }
};
