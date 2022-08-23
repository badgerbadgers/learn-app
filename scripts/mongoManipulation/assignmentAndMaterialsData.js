const utils = require("./utils.js");
const { MongoClient } = require("mongodb");

//This sccript inserts assignment and materials collection into lesson collection
//bottom function removes this data

// ------------material Data----------
async function getMaterials() {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  let results = [];
  const db = client.db("myFirstDatabase");
  try {
    results = db
      .collection("lessons")
      .aggregate([
        {
          $lookup: {
            from: "materials",
            localField: "materials_airtableID",
            foreignField: "materials_airtableID",
            as: "materials_data",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  materials_title: { $toString: "$materials_title" },
                  source: { $toString: "$source" },
                  url: { $toString: "$url" },
                },
              },
            ],
          },
        },
      ])
      .toArray();
    //   console.log('RESULTS', results)
    // results.then()
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return results;
}
const materialsData = getMaterials();
materialsData.then(async (res) => {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");
  res.forEach((lesson) => {
    const materialsDataArray = [];
    lesson.materials_data.forEach((material) => {
      materialsDataArray.push(material);
    });
    // console.log('new array', lesson.lesson_label, lesson._id, materialsDataArray)

    // db.collection("lessons").updateOne(
    //   { _id: lesson._id },
    //   {
    //     $set: {
    //       materials_Data: materialsDataArray,
    //     },
    //   }

    // );
  });
});

// ------------assignment Data----------
async function getAssignments() {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  let results = [];
  const db = client.db("myFirstDatabase");
  try {
    results = db
      .collection("lessons")
      .aggregate([
        {
          $lookup: {
            from: "assignments",
            localField: "assignment_airtableID",
            foreignField: "assignment_airtableID",
            as: "assignment_data",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  assignment_title: 1,
                  link: 1,
                },
              },
            ],
          },
        },
      ])
      .toArray();
    //   console.log('RESULTS', results)
    // results.then()
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return results;
}
const assignmentData = getAssignments();
assignmentData.then(async (res) => {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");
  res.forEach((lesson) => {
    const assignmentDataArray = [];
    lesson.assignment_data.forEach((assignment) => {
      assignmentDataArray.push(assignment);
    });
    // console.log('new array', lesson.lesson_label, lesson._id, assignmentDataArray)

    // db.collection('lessons').updateOne(
    //     {_id: lesson._id},
    //     {$set: {
    //         assignment_Data:assignmentDataArray
    //     }
    //     }

    // )
  });
});
getAssignments().then(() => {
  console.log("all done");
  process.exit(0);
});

const removeFieldData = async () => {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");
  try {
    db.collection("lessons").updateMany(
      // query all
      {},
      // update
      {
        $unset: {
          assignment_Data: 1,
          materials_Data: 1,
        },
      },
      {}
    );
  } catch (e) {
    console.log("ERROR ", e.message);
  }
};
removeFieldData();
