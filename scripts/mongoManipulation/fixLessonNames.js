/*
This script creates a proper lesson title field based on the lesson_label one
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

const fixLessonNames = async () => {
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);

  try {
    const results = await db
      .collection("lessons")
      .aggregate([
        {
          $project: {
            lesson_label: 1,
          },
        },
        {
          $set: {
            title: {
              $trim: {
                input: {
                  $arrayElemAt: [
                    {
                      $split: ["$lesson_label", ":"],
                    },
                    1,
                  ],
                },
              },
            },
          },
        },
        {
          $merge: {
            into: "lessons",
            on: "_id",
            whenMatched: "merge",
            whenNotMatched: "discard",
          },
        },
      ])
      .toArray();

    console.log("lesson title aggregation ran");
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};

const run = async () => {
  await fixLessonNames();

  console.log("all done");
  process.exit(0);
};

