import Cohort from "../lib/models/Cohort";
import Lesson from "../lib/models/Lesson";
import Course from "../lib/models/Course";
import Assignment from "../lib/models/Assignment";
import Material from "../lib/models/Material";
import Section from "../lib/models/Section";
import dbConnect from "../lib/dbConnect";

const getCohortSchedule = async (slug) => {
  await dbConnect();
  let schedule = [];
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
            select: "title order",
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

    schedule = cohort.schedule;
    return schedule;
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return schedule;
};

// TODO: delete empty objs from schedule

const getZoomLink = async (slug) => {
  await dbConnect();
  try {
    const cohort = await Cohort.findOne({ slug: slug }, "zoom_link");

    if (cohort.zoom_link == "") {
      console.log("no zoom link yet");
    }
    return cohort.zoom_link;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

export { getCohortSchedule, getZoomLink };
