import { MongoClient } from "mongodb";

const getMongoLessons = async () => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const db = client.db("myFirstDatabase");
  let lessonResults = [];
  try {
    await client.connect();
    const cursor = await db.collection("cohorts").aggregate([
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
      //stage 3 array to obj
      {
        $unwind: "$course",
      },
      // stage 4 courses-->lessons
      {
        $lookup: {
          from: "lessons",
          localField: "course.lessons",
          foreignField: "_id",
          as: "course.lessons",
        },
      },
    ]);
    if (await cursor.hasNext()) {
      //get first item in the cursor
      const cohort = await cursor.next();
      lessonResults = cohort.course.lessons;
      return lessonResults;
    }
    //you should give an else and something to happen to the empty lessonResults array
  } catch (e) {
    console.log("ERROR", e.message);
  }

  return lessonResults;
};

async function mongoLessonsAfterPipeline() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const resultArray = [];

  try {
    const lessons = await getMongoLessons();

    await lessons.forEach((lesson) => resultArray.push(lesson));
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  } finally {
    return resultArray;
  }
}
export { mongoLessonsAfterPipeline };

