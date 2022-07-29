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
        if ((await cursorCohorts.count()) === 0) {   //TODO: replace count
            console.log("No cohorts found!");
        }
        cohorts = await cursorCohorts.toArray();
        console.log("cohorts 1st", cohorts);
        const ids = cohorts.map(cohort => ObjectId(cohort.course_id));
        console.log("ids", ids);

        const cohortCache = {}
        const coursesCursor = await database
            .collection("courses")
            .find({ "_id": { "$in": ids } })
            .toArray();
        coursesCursor.map(async course => {
            console.log( '<======cohort cache')
            cohortCache[course._id] = course.course_name
            console.log(cohortCache, '<======cohort cache')
        });
        for (let cohort of cohorts) {
            cohort.course_name = cohortCache[cohort.course_id]
        }
        
    } catch (error) {
        console.error(error);
    } 
    // finally {
    //     await client.close();
    // }
    return res.status(200).json(cohorts);
}
