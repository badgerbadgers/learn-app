const env = require("@next/env");

const getConfigParam = async (key) => {
  // prevent exposing keys
  await env.loadEnvConfig("../../");
  return process.env[key] || null;
};

const mongoConnection = async () => {
  const { MongoClient } = require("mongodb");
  const uri = await getConfigParam("MONGODB_URI");
  const client = new MongoClient(uri);
  await client.connect();
  return client;
};

const airtableConnection = async () => {
  const Airtable = require("airtable");
  const airtableToken = await getConfigParam("AIRTABLE_TOKEN");
  const learnLMSId = await getConfigParam("AT_LEARNLMS_BASE");
  try {
    const AtBase = new Airtable({ apiKey: airtableToken }).base(learnLMSId); //The ID of Class Mangement base
    return AtBase;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const insertToMongo = async (data, coll) => {
  // @param {<Object>} data
  // @param {string} collection in Mongo

  const collectionFilterField = {
    // Filters mapping  for reusing func insertToMongo with different collections
    courses: "course_name",
    cohorts: "cohort_name",
    assignments: "assignment_title",
    lessons: "lesson_label",
    materials: "materials_title",
  };

  const dbName = await getConfigParam("MONGODB_DB");
  const client = await mongoConnection();
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
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when finish/error
    await client.close();
  }
};

module.exports = {
  getConfigParam,
  mongoConnection,
  airtableConnection,
  insertToMongo,
};

