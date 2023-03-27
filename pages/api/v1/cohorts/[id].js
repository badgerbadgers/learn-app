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
 *         description: Error messages if cohort to delete not found
 */

// TODO - swagger - what returns from DELETED request

import Cohort from 'lib/models/Cohort';
import dbConnect from 'lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const cohort = await Cohort.findById(id).exec(); // API does not return deleted cohort, the ones with timestamp in property deleted_at (returns { data: null } for deleted cohort)

        const allCohorts = await Cohort.find({}).exec();

        res.status(200).json({ data: cohort });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedCohort = await Cohort.findByIdAndUpdate(id, {
          deleted_at: new Date(),
        });
        if (!deletedCohort) {
          res.status(404).json({
            message: `Failed to delete cohort with id ${id}. Cohort not found`,
          });
          return;
        }
        // 204 (No Content)
        res.status(204).json({ success: true });
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
