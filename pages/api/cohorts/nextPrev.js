import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const { currCohortName, targetDate } = req.query;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const cohortList = await Cohort.find({})
        .sort({"start_date": "asc"})
        .select("start_date slug");  
        
        getTwoClosestCohorts(cohortList, targetDate )
        console.log(cohortList)
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



const getTwoClosestCohorts = (cohortList, target) => {
  let [lo, hi] = [0, cohortList.length-1];
    if (cohortList[lo].start_date == target == cohortList[hi].start_date) {

      return [lo, hi]
    }


}