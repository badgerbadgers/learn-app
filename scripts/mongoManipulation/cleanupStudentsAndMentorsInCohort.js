/*
First cleanup Student and Mentors as empty array
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

const cleanupStudentsAndMentorsIhCohort = async () => {
  const confParam = await getConfigParam("MONGODB_DB");
  const client = await mongoConnection();
  const db = client.db(confParam);

  try {
    const results = await db.collection("cohorts").updateMany(
      {},
      {
        $set: {
          students: [],
          mentors: [],
        },
      }
    );
      return results;
  } catch (e) {
    console.error(e);
  }
};

cleanupStudentsAndMentorsIhCohort().then(() => {
  console.log("all done");
  process.exit(0);
});