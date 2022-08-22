const utils = require("./utils.js");
const { MongoClient, ObjectId } = require("mongodb");

//This script is getting the assignment and materials object Ids string from their collecttion  
// turning the hexadecimal string back into the object Id and updating into the lesson collection
 
////////////TO DO: import db variables///////////
const getObjectIDs = async (from, localField, foreignField, as) => {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  let results = [];
  const db = client.db("myFirstDatabase");
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

const hex2object = async (lessons, field) => {
  //lessons = results from getObjectIDs func
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");
  for (let lesson of lessons) {
    const idArray = [];
    lesson[field].forEach((item) => {
      const id = ObjectId(item.id);
      idArray.push(id);
    });
    console.log(
      "new assignment array",
      lesson.lesson_label,
      lesson._id,
      idArray
    );
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
  const newAssignmentsLessons = await getObjectIDs(
    "assignments",
    "assignment_airtableID",
    "assignment_airtableID",
    "assignments"
  );
  await hex2object(newAssignmentsLessons, "assignments");

  const newMaterialsLessons = await getObjectIDs(
    "materials",
    "materials_airtableID",
    "materials_airtableID",
    "materials"
  );

  await hex2object(newMaterialsLessons, "materials");
};

main().then(() => {
  console.log("all done");
  process.exit(0);
});
