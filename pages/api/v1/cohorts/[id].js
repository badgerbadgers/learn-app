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
 *         description: 635841bd9be844015c74719a
 *     responses:
 *       200:
 *         description: Provides a cohort data
 *       400:
 *         description: Error messages
 */

import Cohort from 'lib/models/Cohort';
import dbConnect from 'lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const cohort = await Cohort.findById(id).exec(); // API does return deleted cohort (with timestamp in property deleted_at)
        res.status(200).json({ data: cohort });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}
