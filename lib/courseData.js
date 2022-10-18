import Cohort from "../lib/models/Cohort";
import Lesson from "../lib/models/Lesson";
import Course from "../lib/models/Course";
import Assignment from "../lib/models/Assignment";
import Material from "../lib/models/Material";
import Section from "../lib/models/Section";
import dbConnect from "../lib/dbConnect"; 

// const getSchedule = async () => { 
//   await dbConnect();
//   try { 
//     const cohort = await Cohort.findOne({ slug: "brain-slug" }).populate({
//       path: "course",
//         model: "Course",
//         select: "course_name",
//         // course -->lessons
//         populate: {
//           path: "lessons",
//           model: "Lesson",
//           // populating assignments and materials
//           populate: {
//             path: "assignments materials section",
//           },
//         },
//     }).populate({ 
//       path:"schedule.lesson", 
//       model: "Lesson",
//       // select:"course_name"
//       populate: { 
//         path:"assignments materials section"
//       }
      
//     })
//     console.log("test8",JSON.stringify(cohort, null, 4) )
//   } catch (e) {
//     console.log("ERROR", e.message);
//   } 
// }
// getSchedule()

const getMongoLessons = async (slug) => {
  await dbConnect();
  let lessonResults = [];
  if (!slug) {
    return null;
  }
  try {
    const cohort = await Cohort.findOne({ slug: slug })
      .populate({
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
      }).populate({ 
        path:"schedule.lesson", 
        model: "Lesson",
        // select:"course_name"
        populate: { 
          path:"assignments materials section"
        }
        
      })
      .exec();
    // console.log(cohort.course.lessons)
    // console.log("test",cohort.schedule )
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
    return cohort.zoom_link;
  } catch (e) {
    console.log("ERROR", e.message);
  }
};

export { mongoLessonsAfterPipeline, getZoomLink };
