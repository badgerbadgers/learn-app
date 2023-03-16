import { createSchedule, sanitize } from "../cohorts";

import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "PUT") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  await dbConnect();

  try {
    let count = 0;
    for await (const cohort of Cohort.find()) {
      await cohort.save();
      count++;
    }

    res.status(200).json({ message: `updated ${count} cohorts` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
