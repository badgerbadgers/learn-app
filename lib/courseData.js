
import clientPromise from "../lib/mongodb"

const getMongoLessons = async () => {
  const client = await clientPromise;
  const db = client.db("myFirstDatabase");
  let lessonResults = [];
  try {
    await client.connect();
    
    const cursor = await db.collection("cohorts").aggregate([
      //stage 1
      {
        $match: {
          slug: "yeti",
        },
      },
      //stage 2
      {
        $project: {
          course: 1,
          
        },
      },
      //stage 3 cohorts-->courses
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      //stage 4 array to obj
      {
        $unwind: {
          path: "$course",
        },
      },
     // stage 5 courses-->lessons
      {
        $lookup: {
          from: "lessons",
          let: {
            lesson_ids: "$course.lessons",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$lesson_ids"],
                },
              },
            },
            {
              $sort: {
                order: 1,
              },
            },
            //filling in materials as part of getting lessons
            {
              $lookup: {
                from: "materials",
                let: {
                  material_ids: "$materials._id",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ["$_id", "$$material_ids"],
                      },
                    },
                  },
                ],
                as: "materials",
              },
            },
           // filling in assignments as part of getting lessons
            {
              $lookup: {
                from: "assignments",
                let: {
                  assignment_ids: "$assignments._id",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ["$_id", "$$assignment_ids"],
                      },
                    },
                  },
                ],
                as: "assignments",
              },
            },
          ],
          as: "course.lessons",
        },
      },
    ]);
   
    //get first item in the cursor
    if (await cursor.hasNext()) {
      //returns the next document in cursor
      const cohort = await cursor.next();
      lessonResults = cohort.course.lessons;
      return lessonResults;
    } else {
      //you should give an else and something to happen to the empty lessonResults array
      console.log("there are no documents in lessonResults");
    }
  } catch (e) {
    console.log("ERROR", e.message);
  }

  return lessonResults;
};

async function mongoLessonsAfterPipeline() {
  const client = await clientPromise;
  await client.connect();
  let resultArray = [];

  try {
    resultArray = await getMongoLessons();
    //console.log(resultArray, "after sort");

    //lessons.forEach((lesson) => resultArray.push(lesson));
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  } finally {
    //console.log(resultArray, "results here");
    return resultArray;
  }
}
export { mongoLessonsAfterPipeline };
