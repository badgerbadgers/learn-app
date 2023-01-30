/*
First cleanup Mentors as empty array in Cohort
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

const cleanupMentorsIhCohort = async () => {
  const confParam = await getConfigParam("MONGODB_DB");
  const client = await mongoConnection();
  const db = client.db(confParam);

  try {
    const results = await db.collection("cohorts").updateMany(
      {},
      {
        $set: {
          mentors: [],
        },
      }
    );
      return results;
  } catch (e) {
    console.error(e);
  }
};

cleanupMentorsIhCohort().then(() => {
  console.log("all done");
  process.exit(0);
});