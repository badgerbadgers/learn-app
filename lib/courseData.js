import { MongoClient } from "mongodb";

// courses
// const uri = process.env.MONGODB_URI;
//   const client = new MongoClient(uri);

async function getMongoLessons() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("myFirstDatabase");

  try {
    const results = await db
      .collection("cohorts")
      .aggregate([
        // stage 1
        {
          $match: { slug: "yeti" },
        },
        // stage 2 cohorts-->courses
        {
          $lookup: {
            from: "courses",
            localField: "course_id",
            foreignField: "_id",
            as: "course",
          },
        },
        //stage 3
        {
          $unwind: "$course",
        },
        // stage 4 courses-->lessons
        {
          $lookup: {
            from: "lessons",
            localField: "course.lessons",
            foreignField: "_id",
            as: "course.lessonData",
          },
        },
        // stage 5
        {
          $unwind: "$course.lessonData",
        },
      ])
      .toArray();

    console.log("pipeline", results);
    process.exit(0);
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return results;
}
export { getMongoLessons };

// const getCourseConnection = getMongoCourses()
// getCourseConnection.then(async res =>{
//   const uri = process.env.MONGODB_URI;
//   const client = new MongoClient(uri);
//   await client.connect();
//   const db = client.db("myFirstDatabase");
//   res.forEach(cohort =>{
//     const newCourseArray =[]
//     cohort.course_connection.forEach(course =>{
//       newCourseArray.push(course._id)
//     })
//     console.log("results", newCourseArray)
//   })
// })

// process.exit(0);
//Lessons
// async function getMongoLessons() {
//   try {

//     const resultArray = [];
//     await client.connect();
//     const db = client.db("myFirstDatabase");
//     const lessonColl = db.collection("lessons");

//     const cursor = lessonColl
//       .find({}, { projection: { _id: 0 } })
//       .sort({ order: 1 });
//     await cursor.forEach((lessonObj) =>
//       console.log(resultArray.push(lessonObj))
//     );
//     // getting collections excluding id
//     console.log(resultArray);
//   } catch {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
//   return resultArray;
// }

// export { getMongoLessons };
