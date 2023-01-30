/*
This script replaced an usersprofile IDs in Cohort collection students.user field to user IDs
*/

const { ObjectId } = require("mongodb");
const { mongoConnection, getConfigParam } = require("../utils.js");

const replaceUsersprofileIdToUserId = async () => {
  const confParam = await getConfigParam("MONGODB_DB");
  const client = await mongoConnection();
  const db = client.db(confParam);

  try {
    const results = await db
      .collection("cohorts")
      .aggregate([
        {
          $match: {
            "students.0": {
              $exists: true,
            },
          },
        },
        {
          $project: {
            students: true,
          },
        },
        {
          $unwind: {
            path: "$students",
          },
        },
        {
          $lookup: {
            from: "usersprofile",
            localField: "students.user",
            foreignField: "_id",
            as: "newobj",
          },
        },
        {
          $set: {
            newobj: {
              $first: "$newobj.userId",
            },
          },
        },
        {
          $set: {
            "students.user": "$newobj",
          },
        },
        {
          $unset: "newobj",
        },
        {
          $match: {
            "students.user": {
              $exists: true
            }
          },
        },
        {
          $group: {
            _id: "$_id",
            students: {
              $push: {
                user: "$students.user",
                added_at: "$students.added_at",
              },
            },
          },
        },
        {
          $merge: {
            on: "_id",
            into: "cohorts",
            whenMatched: "merge",
            whenNotMatched: "discard",
          },
        },
      ])
      .toArray();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

const run = async () => {
  await replaceUsersprofileIdToUserId();
  console.log("all done");
  process.exit(0);
};

run();
