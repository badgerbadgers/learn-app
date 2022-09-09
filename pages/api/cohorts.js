const { ObjectId } = require('mongodb');
import Cohort from "../../lib/models/Cohort";
import Course from "../../lib/models/Course";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect()
    switch (method) {
        case "GET":
            return await getCohorts(req, res);
        case "POST":
            return await createCohort(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${ method } Not Allowed`);
    }
};


const getCohorts = async (req, res) => {
    let cohorts = [];
    try {
        cohorts = await Cohort.find({}).populate("course_id", "_id course_name").exec();                 
        res.status(200).json({ success: true, data: JSON.stringify(cohorts) })
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false })
      }
      return res
 
};

const createCohort = async (req, res) => {
    try {
        const cohortToDb = await sanitize(JSON.parse(req.body.body));  
        const cohort = await Cohort.create(cohortToDb)
        if (!cohort) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: cohort })
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
      }
      return res
};

const sanitize = async (obj) => {
    return {
        cohort_name: obj.cohortName,
        course_id: ObjectId(obj.courseName),
        start_date: obj.startDate ? new Date(obj.startDate) : null,
        seats: obj.seats || 0,
        slug: obj.cohortName.trim().replaceAll(' ', '-').toLowerCase(),
        created_at: obj.created_at ? obj.created_at : new Date(),
    }
};
