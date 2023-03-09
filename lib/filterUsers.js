import Cohort from "./models/Cohort";
import mongoose from "mongoose";
import User from "./models/User";

const filterUsers = async (filters) => {
  var ObjectId = mongoose.Types.ObjectId;

  //all users
  if (!filters.cohort && !filters.course && !filters.role) {
    return await User.find({});
  }

  const match = {};
  const union = [];
  const project = {
    students: true,
    mentors: true,
  };

  if (!!filters.cohort) {
    match._id = new ObjectId(filters.cohort);
  }

  if (!!filters.course) {
    match.course = new ObjectId(filters.course);
  }

  if (!!filters.role) {
    switch (filters.role) {
      case "mentors":
        delete project.students;
        union.push("$mentors.user");
        break;
      case "students":
        delete project.mentors;
        union.push("$students.user");
        break;
      default:
        throw new Error(`unrecognized role filter "${filters.role}"`);
    }
  } else {
    union.push("$mentors.user");
    union.push("$students.user");
  }

  return await Cohort.aggregate([
    {
      $match: match,
    },
    {
      $project: project,
    },
    {
      $project: {
        user: {
          $setUnion: union,
        },
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $group: {
        _id: "user", user: {
          $addToSet: "$user"
        }
      }
    },
    {
      $unwind: {
        path: "$user",
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        $and: [
          { "user.0": { $exists: true }},
          { "user.0.deleted_at": null }
        ]
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $first: "$user",
        },
      },
    },
  ]).exec();
};

export default filterUsers;
