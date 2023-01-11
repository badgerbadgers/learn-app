import Cohort from "./models/Cohort"
import mongoose from "mongoose";
import User from "./models/User";


 const filterUsers = async (filters) => {

  var ObjectId = mongoose.Types.ObjectId;
  let filter = [];
  let filterId = "";
  //all users
  if(!filters.length){
    filter = await User.aggregate([{$match: {}}])
  }
//course filter
  if(filters.course){
    filterId = filters.course

    filter = await Cohort.aggregate([
      {
        $match: {
          course: new ObjectId(filterId),
        },
      },
      {
        $project: {
          students: true,
          mentors: true,
        },
      },
      {
        $project: {
          user: {
            $setUnion: ["$students.user", "$mentors.user"],
          },
        },
      },
      {
        $unwind: {
          path: "$user",
        },
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
        $replaceRoot: {
          newRoot: {
            $first: "$user",
          },
        },
      },
    ]).exec();
    
  }
  //cohort filter
 if(filters.cohort){
  filterId = filters.cohort;
  console.log("cohortid:", filterId)
     filter = await Cohort.aggregate(
    
    [
  {
    '$match': {
      _id : new ObjectId(filterId)
    }
  }, {
    '$project': {
      'students': true, 
      'mentors': true
    }
  }, {
    '$project': {
      'user': {
        '$setUnion': [
          '$students.user', '$mentors.user'
        ]
      }
    }
  }, {
    '$unwind': {
      'path': '$user'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'user', 
      'foreignField': '_id', 
      'as': 'user'
    }
  }, {
    '$replaceRoot': {
      'newRoot': {
        '$first': '$user'
      }
    }
  }
]).exec()

 } 
 //if role is mentor
 if(filters.role && filters.role === "1") {

  filter = await Cohort.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        mentors: true,
      },
    },
    {
      $project: {
        user: {
          $setUnion: [ "$mentors.user"],
        },
      },
    },
    {
      $unwind: {
        path: "$user",
      },
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
      $replaceRoot: {
        newRoot: {
          $first: "$user",
        },
      },
    },
  ]).exec();
 }

 //if role is stident
 if(filters.role && filters.role === "2") {
  filter = await Cohort.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        students: true,
      },
    },
    {
      $project: {
        user: {
          $setUnion: ["$students.user"],
        },
      },
    },
    {
      $unwind: {
        path: "$user",
      },
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
      $replaceRoot: {
        newRoot: {
          $first: "$user",
        },
      },
    },
  ]).exec();
 }

return filter
}

export default filterUsers;