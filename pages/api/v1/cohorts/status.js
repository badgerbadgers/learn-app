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
    const count = await updateCohorts();
    res.status(200).json({ message: `Updated ${count} cohorts`, count });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

export const updateCohorts = async () => {
  try {
    await dbConnect();
    let count = 0;
    for (const cohort of await Cohort.find()) {
      count++;
      await cohort.save();
    }
    return count;
  } catch (error) {
    throw new Error(error.message);
  }
};
