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
    const query = [
        // {
        //     courseId: { $toObjectId: "$course_id" }
        // },
        {
            $lookup: {
                from: "courses",
                localField: "course_id",
                foreignField: "_id",
                as: "course"
            }
        }
        // {
        //     course_title: {"$first": "$course.course_name"}
        // }
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
    // finally {  // TBD: Why does it interfere with a session? Why does it close everything?
    //     await client.close();
    // }
    return res.status(200).json(cohorts);
}
