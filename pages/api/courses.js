import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getCourses(req, res);
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getCourses = async (req, res) => {
   
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DB);
    const options = {
        // sort returned documents in ascending order by start date (A->Z)
        sort: { start_date: 1 },
        projection: {airtable_id:0},
    };
    const query = {};
    const courses = [];
    try {
        let cursor = await database
            .collection("courses")
            .find(query, options);
            if ((await cursor.count()) === 0) {
                console.log("No courses found!");    
            }
            await cursor.forEach(course => courses.push(course));
            return res.status(200).json(courses);
    } catch (error) {
        console.error(error);
    }
}