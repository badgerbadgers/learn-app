const utils = require("./utils.js");
const { MongoClient } = require("mongodb");

//this script is to flatten the link object in the assignment collection 

const minifyAssignments = async () => {
  const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");
  try {

    await db.collection("assignments").updateMany(
        // query
        {link:{$exists:true}},
        // update: [] for aggregation pipeline
        [{$set:{link:"$link.url"}}], 
        // options
        {}
    );
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

minifyAssignments().then(() => {
    console.log("all done");
    process.exit(0);
  });


