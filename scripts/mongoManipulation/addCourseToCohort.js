/*
This script is inserting the object ID reference of the right course to the cohorts collection
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

const fixCourseReference = async () => {
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);

  try {
    const results = await db
      .collection("cohorts")
      .aggregate([
        //find the relevant object from the other collection
        {
          $lookup: {
            from: "courses",
            localField: "course_airtableID",
            foreignField: "airtable_id",
            as: "course",
          },
        },
        //move it out of the array
        {
          $unwind: {
            path: "$course",
          },
        },
        //change it from object to id
        {
          $set: {
            course: "$course._id",
          },
        },
        // merge into existing collection
        {
          $merge: {
            on: "_id",
            into: "cohorts",
            whenMatched: "merge",
            whenNotMatched: "discard",
          },
        },
      ])
      .toArray(); //<-- without a call to toArray(), the aggregation does not execute
  } catch (e) {
    console.log("ERROR", e.message);
  } finally {
    await client.close();
  }
};

const run = async () => {
  await fixCourseReference();

  console.log("all done");
  process.exit(0);
};

run();

