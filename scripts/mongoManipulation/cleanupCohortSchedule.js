/*
This script is to remove empty objects from the cohort schedule
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

const removeObjects = async () => {
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);
  try {
    const filteredSchedule = await db.collection("cohorts").updateMany(
      {},

      { $pull: { schedule: { $in: [{}] } } }
    );

    return filteredSchedule;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

removeObjects().then(() => {
  console.log("all done");
  process.exit(0);
});
