import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "GET":
            return getCohorts(req, res);
        case "POST":
            return updateCohorts(req, res);
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


const updateCohorts = async (req, res) => { 
    const cohort = JSON.parse(req.body.body);
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection("cohorts"); 
    const updatedCohort = {
        cohort_name: cohort.cohortName.trim(), // do we actually need to remove whitespace from the title? 
        course_id: ObjectId(cohort.courseName),
        start_date: cohort.startDate ? new Date(cohort.startDate) : null,
        slug: cohort.cohortName.trim().replaceAll(' ', '-').toLowerCase(),
        seats: cohort.seats ? cohort.seats: 0,
        created_at: cohort.created_at? cohort.created_at: new Date(),
    };
    const filter = {_id: ObjectId(cohort.isNew? null : cohort.id)};

    await collection.updateOne(filter, {$set: updatedCohort}, {upsert: true}).then(res => console.log(res));

    return res.status(200).end();
}
