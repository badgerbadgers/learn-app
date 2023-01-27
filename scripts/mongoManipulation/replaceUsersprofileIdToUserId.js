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
            cohort_name: {
              $first: "$cohort_name",
            },
            start_date: {
              $first: "$start_date",
            },
            zoom_link: {
              $first: "$zoom_link",
            },
            status: {
              $first: "$status",
            },
            students: {
              $push: {
                user: "$students.user",
                added_at: "$students.added_at",
              },
            },
            mentors: {
              $first: "$mentors",
            },
            seats: {
              $first: "$seats",
            },
            slug: {
              $first: "$slug",
            },
            course: {
              $first: "$course",
            },
            schedule: {
              $first: "$schedule",
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
