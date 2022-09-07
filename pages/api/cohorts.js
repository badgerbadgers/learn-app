const { ObjectId } = require('mongodb');
import Cohort from "../../lib/models/Cohort";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "GET":
            return getCohorts(req, res);
        case "POST":
            try {
                const cohortToDb = await sanitize(JSON.parse(req.body.body));  
                const cohort = await Cohort.create(cohortToDb)
                if (!cohort) {
                  return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true,  _id: cohort._id, data: cohortToDb })
              } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
              }
              break
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getCohorts = async (req, res) => {
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DB);
    const options = {
        sort: { start_date: 1 },
        projection: { _id: 0 },
    };
    const query = [
        {
            $lookup: {
                from: "courses",
                localField: "course_id",
                foreignField: "_id",
                as: "course"
            }
        }
    ];
    let cohorts = [];
    try {
        let cursorCohorts = await database
            .collection("cohorts")
            .aggregate(query);
        cohorts = await cursorCohorts.toArray();        
    } catch (error) {
        console.error(error);
    } 
    return res.status(200).json(cohorts);
}

const sanitize = async (obj) => {
    return {
        cohort_name: obj.cohortName,
        course_id: ObjectId(obj.courseName),
        start_date: obj.startDate ? new Date(obj.startDate) : null,
        seats: obj.seats || 0,
        slug: obj.cohortName.trim().replaceAll(' ', '-').toLowerCase(),
        created_at: obj.created_at ? obj.created_at : new Date(),
    }
}
