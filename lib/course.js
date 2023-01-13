
import Lesson from "../lib/models/Lesson";
import Course from "../lib/models/Course";
import Assignment from "../lib/models/Assignment";
import Material from "../lib/models/Material";
import dbConnect from "../lib/dbConnect";
import Section from "../lib/models/Section";

// getting individual course
const getCourseFromMongo = async (courseName) => {
  await dbConnect();
  let courseResults = [];
  if (!courseName) {
    return null;
  }
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
      
    return courseResults;
  } catch (e) {
    console.log("ERROR", e.message);
  }
  return courseResults;
}; 

const getAllCourses = async () => {
  await dbConnect();
  let allCourses = [];
  try { 
    const courses = await Course.find({}).select({course_name:1, slug:1}) 
    
    allCourses=courses
    return allCourses
  } catch(e) { 
    console.log("Error", e.message)
  }
} 


export {getCourseFromMongo, getAllCourses}
