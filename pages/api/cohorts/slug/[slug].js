import Cohort from "../../../../lib/models/Cohort";
import Course from "../../../../lib/models/Course";
import Section from "../../../../lib/models/Section";
import Student from "../../../../lib/models/Student";
import dbConnect from "../../../../lib/dbConnect";

export default async function handler(req, res) { 
  
  const { method } = req;
  const slug = req.query.slug;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        // API won't return cohorts with time stapm in property deleted_at
        const cohort = await Cohort.findOne({ slug: slug })
          .populate(
            [
              {
                path: "course",
                model: "Course",
                select: "course_name",
              },
              {
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
                path: "students",
                model: "Student",
                select: "firstName lastName email",
              },
             
            ]
          ).exec();
        res.status(200).json({ cohort: cohort })
       
      } catch (error) {
        console.error(error)
        res.status(400).json({ success: false })
      }
      break
  }
}
