const { mongoConnection } = require("../utils.js");

//This script is inserting the object IDs from assignments and materials to lessons collection

const getObjectIDs = async (from, localField, foreignField, newField) => {
  let client = await mongoConnection();
  let db = client.db("myFirstDatabase");
  let results = [];

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
