const { mongoConnection, getConfigParam } = require("../utils.js");

//This script is inserting the object IDs from assignments and materials to lessons collection

const getObjectIDs = async (from, localField, foreignField, newField) => {
  console.log(
    `getting ${from} object ids and putting them in field ${newField}`
  );
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);

  try {
    const set = { [newField]: `$${newField}._id` };
    const project = { _id: 1, [newField]: 1 };
    const results = await db
      .collection("lessons")
      .aggregate([
        //find the relevant object from the other collection
        {
          $lookup: {
            from: from,
            localField: localField,
            foreignField: foreignField,
            as: newField,
          },
        },
        //put the relevant ids from the other collection in the new field
        {
          $set: set,
        },
        //minimize object to be only id and new field
        {
          $project: project,
        },
        // merge into existing collection
        {
          $merge: {
            on: "_id",
            into: "lessons",
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
  //materials
  await getObjectIDs(
    "materials",
    "materials_airtableID",
    "materials_airtableID",
    "materials"
  );

  //assignments
  await getObjectIDs(
    "assignments",
    "assignment_airtableID",
    "assignment_airtableID",
    "assignments"
  );

  console.log("all done");
  process.exit(0);
};

run();

