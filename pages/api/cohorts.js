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
        // Include only the `title` and `imdb` fields in each returned document
        projection: { _id: 0, cohort_name: 1, start_date: 1 },
    };
    const query = {};
    console.log(client);
    const cohorts = [];
    try {
        let cursor = await database
            .collection("cohorts")
            .find(query, options);

            
            
            // print a message if no documents were found
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
// run().catch(console.dir);