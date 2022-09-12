const {
  airtableConnection,
  mongoConnection,
  getConfigParam,
} = require("../utils.js");

//This script is fetching the learning objectives from airtable and turning the objectives field in the lessons collection from a string to an array

const getLearningObjectives = async () => {
  const dbName = await getConfigParam("MONGODB_DB");

  //connecting to mongo db
  const client = await mongoConnection();
  const db = client.db(dbName);
  //connecting to airtable
  const AtBase = await airtableConnection();

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
      console.log(objectivesArray);

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
getLearningObjectives().then(() => {
  console.log("all done");
  process.exit(0);
});

