import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getCohorts(req, res);
        default:
            res.setHeader("Allow", ["GET"]);
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
    const query = {};
    let cohorts = [];
    try {
        let cursorCohorts = await database
            .collection("cohorts")
            .find(query, options);
        if ((await cursorCohorts.count()) === 0) {   //TODO: replace count, use `collection.estimatedDocumentCount` or `collection.countDocuments` instead
            console.log("No cohorts found!");
        }
        cohorts = await cursorCohorts.toArray();
        const ids = cohorts.map(cohort => ObjectId(cohort.course_id));
        const cohortCache = {}
        const coursesCursor = await database
            .collection("courses")
            .find({ "_id": { "$in": ids } })
            .toArray();
        coursesCursor.map(async course => {
            cohortCache[course._id] = course.course_name
        });
        for (let cohort of cohorts) {
            cohort.course_name = cohortCache[cohort.course_id]
        }
        
    } catch (error) {
        console.error(error);
    } 
    // finally {  // TBD: Why does it interfere with a session? Why does it close everything?
    //     await client.close();
    // }
    return res.status(200).json(cohorts);
}
