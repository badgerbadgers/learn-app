import Cohort from "../lib/models/Cohort";
import dbConnect from "../lib/dbConnect";

const getMongoLessons = async (slug) => {
  await dbConnect();
  let lessonResults = [];
  if (!slug) {
    return null;
  }
  try {
    const cohort = await Cohort.findOne({ slug: slug })
      // TODO: refactor to add cohort schedule
      .populate({
        // cohort --> course
        path: "course",
        model: "Course",
        select: "course_name",
        // course -->lessons
        populate: {
          path: "lessons",
          model: "Lesson",
          // populating assignments and materials
          populate: {
            path: "assignments materials section",
          },
        },
      })
      .exec();
    lessonResults = cohort.course.lessons;
    return lessonResults;
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return lessonResults;
};

async function mongoLessonsAfterPipeline(slug) {
  let resultArray = [];

  try {
    resultArray = await getMongoLessons(slug);
  } catch (e) {
    console.log("ERROR", e.message);
  } finally {
    return resultArray;
  }
}

const getZoomLink = async (slug) => {
  await dbConnect();
  try {
    const cohort = await Cohort.findOne({ slug: slug }, "zoom_link");
    return cohort.zoom_link;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

export { mongoLessonsAfterPipeline, getZoomLink };
