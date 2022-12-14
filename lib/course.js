
import Lesson from "../lib/models/Lesson";
import Course from "../lib/models/Course";
import Assignment from "../lib/models/Assignment";
import Material from "../lib/models/Material";
import dbConnect from "../lib/dbConnect";

// getting course from mongo
//remember courseName is the place holder for courseSlug
const getCourseFromMongo = async (courseName) => {
  await dbConnect();
  let courseResults = [];
//   if (!courseName) {
//     return null;
//   }
  try {
    const course = await Course.findOne({ slug:courseName })
      .populate({
        path: "lessons",
        model:"Lesson",
        select: "title", 
        populate: {
          path: "assignments materials section",
        },
      })
      .exec();
      courseResults = course;
      console.log("courseResults:",courseResults)
    return courseResults;
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return courseResults;
}; 

export {getCourseFromMongo}
