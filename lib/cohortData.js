import Cohort from "../lib/models/Cohort";
import dbConnect from "../lib/dbConnect";

const getPrevAndNextCohortSlugs = async (id) => {
  await dbConnect();
  if (!id) {
    return null;
  }
  let [prevCohort, nextCohort] = [null, null];
  try {
    const cohort = await Cohort.findOne({ _id: id });
    nextCohort = await Cohort.find({
      $or: [
        { start_date: { $gt: cohort.start_date } },
        {
          $and: [
            { cohort_name: { $gt: cohort.cohort_name } },
            { start_date: cohort.start_date },
          ],
        },
      ],
    })
      .sort({ start_date: "asc", cohort_name: "asc" })
      .select("start_date slug")
      .limit(1);

    prevCohort = await Cohort.find({
      $or: [
        { start_date: { $lt: cohort.start_date } },
        {
          $and: [
            { cohort_name: { $lt: cohort.cohort_name } },
            { start_date: cohort.start_date },
          ],
        },
      ],
    })
      .sort({ start_date: "desc", cohort_name: "desc" })
      .select("start_date slug")
      .limit(1);
  } catch (e) {
    console.log("Get next and prev cohorts error:", e.message);
  }

  return [
    prevCohort[0]?._id.toString() || null,
    nextCohort[0]?._id.toString() || null,
  ];
};

export { getPrevAndNextCohortSlugs };
