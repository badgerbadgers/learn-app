import clientPromise from "../../lib/mongodb";

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
    // return res.status(200).json({db:process.env.MONGODB_DB});
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DB);
    const options = {
        // sort returned documents in ascending order by start date (A->Z)
        sort: { start_date: 1 },
        projection: { _id: 0},
    };
    const query = {};
    const cohorts = [];
    try {
        let cursor = await database
            .collection("cohorts")
            .find(query, options);
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
