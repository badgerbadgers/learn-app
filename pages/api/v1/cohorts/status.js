//NOTE - Will have to be protected outside auth system

/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/status:
 *   patch:
 *     description: Updates all cohorts' status
 *     tags: [Cohorts]
 *     responses:
 *       204:
 *         description: Provides no content
 *       400:
 *         description: Error messages
 */

import Cohort from 'lib/models/Cohort';
import dbConnect from 'lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  if (method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  try {
    await updateCohortsStatus();
    // res.status(200).json({ message: `Updated ${count} cohorts`, count });
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

export const updateCohortsStatus = async () => {
  try {
    await dbConnect();
    // let count = 0;
    for (const cohort of await Cohort.find()) {
      // count++;
      await cohort.save();
    }
    // return count;
  } catch (error) {
    throw new Error(error.message);
  }
};
