const { mongoConnection } = require("../utils.js");
const { ObjectId } = require("mongodb");

//This script is getting the assignment and materials object Ids string from their collecttion
// turning the hexadecimal string back into the object Id and updating into the lesson collection

const getObjectIDs = async (from, localField, foreignField, as) => {
  const client = await mongoConnection();
  const db = client.db("myFirstDatabase");
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
            as: as,
            pipeline: [
              {
                $project: {
                  _id: {
                    $toString: "$_id",
                  },
                },
              },
            ],
          },
        },
      ])
      .toArray();
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return results;
};

// turing the hexadecimal string back into mongo ObjectId
const hexToObject = async (lessons, field) => {
  //lessons = hexadecimal string results from getObjectIDs func
  const client = await mongoConnection()
  const db = client.db("myFirstDatabase");
  for (let lesson of lessons) {
    const idArray = [];
    lesson[field].forEach((item) => {
      const id = ObjectId(item.id);
      idArray.push(id);
      console.log(idArray);
      process.exit(0);
    });
    
    let set = {};
    set[field] = idArray;
    await db.collection("lessons").updateOne(
      { _id: lesson._id },
      {
        $set: set,
      }
    );
  }
};

const main = async () => {
  //assignments
  const newAssignmentsLessons = await getObjectIDs(
    "assignments",
    "assignment_airtableID",
    "assignment_airtableID",
    "assignments"
  );
  await hexToObject(newAssignmentsLessons, "assignments");

  //materials---
  const newMaterialsLessons = await getObjectIDs(
    "materials",
    "materials_airtableID",
    "materials_airtableID",
    "materials"
  );

  await hexToObject(newMaterialsLessons, "materials");
};

main().then(() => {
  console.log("all done");
  process.exit(0);
});
