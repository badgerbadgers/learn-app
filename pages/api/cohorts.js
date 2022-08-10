import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getCohorts(req, res);
        case "POST":
            console.log("POSTING!");
            return updateCohorts(req, res);
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


const updateCohorts = async (req, res) => { // rename? insertUpdateCohort
    // console.log(req);
    const cohort = JSON.parse(req.body.body);
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection("cohorts"); 
    const updatedCohort = {
        cohort_name: cohort.cohortName,
        start_date: cohort.startDate? cohort.startDate : null,
        end_date: cohort.endtDate? cohort.endDate : null,
        slug: cohort.cohortName.replaceAll(' ', '-').toLowerCase(),
        seats: cohort.seats? cohort.seats: 0,
        created_at: cohort.created_at? cohort.created_at: new Date(),
        students: cohort.students? cohort.students: [] ,
        mentors : cohort.mentors? cohort.mentors: [],

    };
    const filter = {_id: ObjectId(cohort.isNew? null : cohort.id)};

    await collection.updateOne(filter, {$set: updatedCohort}, {upsert: true}).then(res => console.log(res));

    return res.status(200).end();
}