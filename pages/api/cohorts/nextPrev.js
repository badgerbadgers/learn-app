import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const { currCohortName, targetDate } = req.query;
  // console.log("query", currCohortName, targetDate)

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const cohortList = await Cohort.find({ "start_date": { "$ne": null } })
          .sort({ "start_date": "asc", "cohort_name": "asc" })
          .select("start_date slug");
        // console.log("cohortList", cohortList);

        const [prev, next] = getTwoClosestCohorts(cohortList, targetDate, currCohortName);
        // console.log("prev next", prev, next);
        res.status(200).json({ cohortList: cohortList })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
  return res;
}

const getTwoClosestCohorts = (cohortList, target, currCohortName) => {
  let [lo, hi] = [0, cohortList.length - 1];
  while (lo < hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (new Date(cohortList[mid].start_date) >= new Date(target)) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  // console.log("!!!!!! target", lo, hi, new Date(target),  new Date(target) == new Date(cohortList[hi].start_date), cohortList[hi]);
  // console.log("exit with",cohortList[hi],  new Date(cohortList[hi].start_date))
}