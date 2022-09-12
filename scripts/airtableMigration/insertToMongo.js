const { mongoConnection, getConfigParam } = require("../utils.js");

// This script inserts collection into mongo and is filtered for different collections

const collectionFilterField = {
  // Filters mapping  for reusing func insertToMongo with different collections
  courses: "course_name",
  cohorts: "cohort_name",
  assignments: "assignment_title",
  lessons: "lesson_label",
  materials: "materials_title",
};

const insertToMongo = async (data, coll) => {
  // @param {<Object>} data
  // @param {string} collection in Mongo

  const dbName = await getConfigParam("MONGODB_DB");
  const client = await mongoConnection();
  async function run() {
    try {
      const database = client.db(dbName);
      const collection = database.collection(coll);

      for (doc of data) {
        const filter = {};
        //matching filtered collection and field to document collection
        filter[collectionFilterField[coll]] = doc[collectionFilterField[coll]];
        // console.log(coll, filter, doc); continue;
        const result = await collection.updateOne(
          filter,
          { $set: doc },
          { upsert: true }
        );
        console.log(`This is the updated document: ${JSON.stringify(result)} `);
      }
    } finally {
      // Ensures that the client will close when finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
};

module.exports = insertToMongo;

