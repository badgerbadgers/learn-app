import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getUsers(req, res);
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getUsers = async (req, res) => {
    // return res.status(200).json({db:process.env.MONGODB_DB});
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DB);
    const options = {
        // sort returned documents in ascending order by start date (A->Z)
        sort: { },
        projection: { _id: 0},
    };
    const users = [];

    try {
        // let userIds = listOfStudents.map(userId => ObjectId(userId));
        // const query = {_id: {$in: userIds }};
        let cursor = await database
            .collection("userprofile")
            .find(query, options).pretty();
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");    
                
            }
            await cursor.forEach(cohort => cohorts.push(cohort));
            return res.status(200).json(cohorts);
    } catch (error) {
        console.error(error);
    }
    // finally {
    //     await client.close();
    // }
}
