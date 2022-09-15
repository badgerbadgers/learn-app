/*
This script is for creating an array of lesson airtable ids with object references in the courses collection
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

const fixLessonsReferences = async () => {
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);

  try {
    const results = await db
      .collection("courses")
      .aggregate([
        //find the relevant object from the other collection
        {
          $lookup: {
            from: "lessons",
            localField: "lesson_airtable_ids",
            foreignField: "airtable_id",
            as: "lessons",
          },
        },
        //change it from object to id
        {
          $set: {
            lessons: "$lessons._id",
          },
        },
        // merge into existing collection
        {
          $merge: {
            on: "_id",
            into: "courses",
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
  await fixLessonsReferences();

  console.log("all done");
  process.exit(0);
};

run();

