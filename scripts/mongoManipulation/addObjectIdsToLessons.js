const { mongoConnection, getConfigParam } = require("../utils.js");

//This script is inserting the object IDs from assignments and materials to lessons collection

const getObjectIDs = async (from, localField, foreignField, newField) => {
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);
  const results = [];

  try {
    results = await db
      .collection("lessons")
      .aggregate([
        {
          $lookup: {
            from: from,
            localField: localField,
            foreignField: foreignField,
            pipeline: [{ $project: { _id: 1 } }],
            as: newField,
          },
        },
        {
          $addFields: { newFresultield: "$newField" },
        },
        { $unset: "result" },
        {
          $merge: {
            into: "lessons",
            whenMatched: "merge",
            whenNotMatched: "discard",
          },
        },
      ])
      .toArray();

    console.log(results);
  } catch (e) {
    console.log("ERROR", e.message);
  }
};


//materials
getObjectIDs(
  "materials",
  "materials_airtableID",
  "materials_airtableID",
  "materials"
);

// //assignments
getObjectIDs(
  "assignments",
  "assignment_airtableID",
  "assignment_airtableID",
  "assignments"
);
