/*
This script converts an array with students IDs in Cohort collection to an array of objects
[id, id, id] => [{id, added_at},{id, added_at},{id, added_at}
*/

const { ObjectId } = require("mongodb");
const { mongoConnection, getConfigParam } = require("../utils.js");


const convertStudentsArr = async () => {
    const confParam = await getConfigParam("MONGODB_DB");
    const client = await mongoConnection();
    const db = client.db(confParam);

    try {
        const cohortsToUpdate = await db
            .collection("cohorts")
            .find(
                // {students: {$gte: {$size: 1}}}, this query doesn't return the expected result
                { 'students.0': { $exists: true } },
            )
            .toArray()
        let bulkOperations = [];
        cohortsToUpdate.map(c => {
            let newStudents = [];
            c.students.map(st => {
                newStudents.push(
                    {
                        user_id: new ObjectId(st),
                        added_at: new Date()
                    }
                )
            })
            bulkOperations.push(
                {
                    updateOne: {
                        filter: {_id: c._id},
                        update: { $set: { "students": newStudents } }
                    }
                }
            )
        })
        await db.collection("cohorts")
            .bulkWrite(bulkOperations)

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

const run = async () => {
    await convertStudentsArr();

    console.log("all done");
    process.exit(0);
};

run();

// $set: {
//     "students.$[]": {
//         "_id": { students.$[]._id },
//         "added_at": new ObjectId(),
//     }
// }
