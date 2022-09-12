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
  const param = await getConfigParam("AT_KEY");
  try {
    const AtBase = new Airtable({ apiKey: param }).base("appN9Hf8KluRDBAN4"); //The ID of Class Mangement base
    return AtBase;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { getConfigParam, mongoConnection, airtableConnection };

