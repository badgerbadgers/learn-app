import clientPromise from "../lib/mongodb";

const getMongoLessons = async (cohortName) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  let lessonResults = [];
  if (!cohortName) {
    return null;
  }
  try {
    await client.connect();

    const cursor = await db.collection("cohorts").aggregate([
      //stage 1
      {
        $match: {
          slug: cohortName,
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
      //stage 5 courses-->lessons
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
                  material_ids: "$materials",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ["$_id", "$$material_ids"],
                        // TODO:sort
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
                  assignment_ids: "$assignments",
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
    }
  } catch (e) {
    console.log("ERROR", e.message);
  }

  return lessonResults;
};

async function mongoLessonsAfterPipeline(cohortName) {
  let resultArray = [];

  try {
    resultArray = await getMongoLessons(cohortName);
  } catch (e) {
    console.log("ERROR", e.message);
  } finally {
    return resultArray;
  }
}

const getZoomLink = async (cohortName) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  try {
    const cohorts = db.collection("cohorts");
    const query = { slug: cohortName };
    const projection = {
      projection: { _id: 0, zoom_link: 1 },
    };

    const cohort = await cohorts.findOne(query, projection);

    return cohort.zoom_link;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

export { mongoLessonsAfterPipeline, getZoomLink };

