const utils = require("./utils.js");
const { MongoClient } = require("mongodb");

//This script is fetching the learning objectives from airtable and turning the objectives field in the lessons collection from a string to an array

const getLearningObjectives = async () => {
  //connecting to mongo db
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");

  //connecting to airtable
  const Airtable = require("airtable");
  const param = await utils.getConfigParam(/AT_KEY=(.+)/);
  const AtBase = new Airtable({ apiKey: param }).base("appN9Hf8KluRDBAN4");

  try {
    //get all lessons from mongo, ordered by "order" field, asc
    const lessonsFromMongo = await db
      .collection("lessons")
      .find()
      .sort({ order: 1 })
      .toArray();

    // get all lessons from airtable,same ordering
    const lessonsFromAirtable = await AtBase("Lessons")
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    // iterate over airtable lessons,grab the same lesson by index from mongo
    for (let i = 0; i < lessonsFromAirtable.length; i++) {
      const AtLesson = lessonsFromAirtable[i];
      const MongoLesson = lessonsFromMongo[i];

      //make sure the lessons match by comparing order
      if (AtLesson.fields.Order != MongoLesson.order) {
        console.log("error, order numbers not matching up");
        return;
      }

      //make sure the objective is a string
      const recordObjective = AtLesson.fields["Learning Objectives"];

      if (typeof recordObjective !== "string") {
        console.log(
          "error, recordObjective for lesson " +
            AtLesson.field.Order +
            " is not a string"
        );
        // if not string skip step
        continue;
      }

      //transform the string into an array
      let objectivesArray = recordObjective
        .split("-")
        .map((element) => element.trim());
      objectivesArray.shift();

      console.log(objectivesArray, typeof objectivesArray);

      //update the mongo record
      await db.collection("lessons").updateOne(
        { _id: MongoLesson._id },
        {
          $set: {
            learning_objectives: objectivesArray,
          },
        }
      );
    }
  } catch (e) {
    console.log("ERROR", e.message);
  }
};
getLearningObjectives();

//-------objectives to array----
// const string2array = async () => {
//   const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
//   const client = new MongoClient(uri);
//   let results = [];
//   await client.connect();
//   const db = client.db("myFirstDatabase");
//   try {
//     const lessonsArray = await db.collection("lessons").find().toArray();

//     //source = lessons coll, lessonsArray = []

//     for (let i = 0; i < lessonsArray.length; i++) {
//       let lesson = lessonsArray[i];

//       let objectives = lesson.learning_objectives;

//       if (typeof objectives === "string") {
//         objectivesArray = objectives
//           .split("-")
//           .map((element) => element.trim());
//         objectivesArray.shift();
//         results = objectivesArray;
//       }
//       //     await db.collection("lessons").updateOne(
//       //     { _id: lesson._id },
//       //     {
//       //       $set: {
//       //         learning_objectives: results
//       //       },
//       //     }//inside the for since we want for every lesson
//       //   );
//     }
//   } catch (e) {
//     console.log("ERROR", e.message);
//   }
// };
// string2array();
