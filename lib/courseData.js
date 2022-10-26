import Cohort from "../lib/models/Cohort";
import Lesson from "../lib/models/Lesson";
import Course from "../lib/models/Course";
import Assignment from "../lib/models/Assignment";
import Material from "../lib/models/Material";
import Section from "../lib/models/Section";
import dbConnect from "../lib/dbConnect";

const getMongoLessons = async (slug) => {
  await dbConnect();
  let lessonResults = [];
  if (!slug) {
    return null;
  }
  try {
    const cohort = await Cohort.findOne({ slug: slug })
      .populate([
        {
          // cohort -->course
          path: "course",
          model: "Course",
          select: "course_name",
        },
        {
          // cohort -->schedule-->section
          path: "schedule",
          model: "Section",
          select: "title",
          populate: {
            path: "section",
            model: "Section",
            select: "title",
          },
        },
        {
          // cohort -->schedule-->lesson
          path: "schedule",
          model: "Lesson",
          select: "title",
          populate: {
            path: "lesson",
            model: "Lesson",
            populate: {
              path: "assignments materials section",
            },
          },
        },
      ])
      .exec();

    console.log("test", JSON.stringify(cohort.schedule, null, 4));
    lessonResults = cohort.schedule;
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
    // TODO: check for if zoom link is empty error
    return cohort.zoom_link;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

export { mongoLessonsAfterPipeline, getZoomLink };
