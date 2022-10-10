import Cohort from "../lib/models/Cohort";
import Lesson from "../lib/models/Lesson";
import Course from "../lib/models/Course";
import Assignment from "../lib/models/Assignment";
import Material from "../lib/models/Material";
import Section from "../lib/models/Section";
import dbConnect from "../lib/dbConnect";

const getMongoLessons = async (cohortName) => {
  await dbConnect();
  let lessonResults = [];
  if (!cohortName) {
    return null;
  }
  try {
    const cohort = await Cohort.findOne({ slug: cohortName })
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
  await dbConnect();
  try {
    const cohort = await Cohort.findOne({ slug: cohortName }, "zoom_link");
    return cohort.zoom_link;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};
export { mongoLessonsAfterPipeline, getZoomLink };
