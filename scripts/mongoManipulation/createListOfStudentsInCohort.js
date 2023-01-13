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
    const results = await db
      .collection("cohorts")
      .aggregate([
        {
          $match: {
            "students.0": {
              $exists: true
            }
          }
        }, {
          $set: {
            "students": {
              $map: {
                input: "$students",
                in: {
                  "user": "$$this",
                  "added_at": "$$NOW"
                }
              }
            }
          }
        },
        {
          $merge: {
            on: "_id",
            into: "cohorts",
            whenMatched: "merge",
            whenNotMatched: "discard",
          },
        }
      ]).toArray();
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
