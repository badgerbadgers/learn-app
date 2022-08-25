const getConfigParam = async (key) => {
  // prevent exposing keys
  let param;
  const fs = require("fs");
  try {
    const data = await fs.promises.readFile("../../.env.local", "utf8");
    param = data.match(key)[1]; //TODO: handle possible index error
  } catch (err) {
    console.error(err);
  }
  return param;
};

const mongoConnection = async () => {
  const { MongoClient } = require("mongodb");
  const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  return client;
};

const airtableConnection = async () =>{ 
  const Airtable = require("airtable");
  const param = await getConfigParam(/AT_KEY=(.+)/);
  const AtBase = new Airtable({ apiKey: param }).base("appN9Hf8KluRDBAN4"); //The ID of Class Mangement base 
  return AtBase;
}

module.exports = { getConfigParam, mongoConnection, airtableConnection };
