import Lesson from "../../lib/models/Lesson";
import Course from "../../lib/models/Course";
// import Assignment from "../../lib/models/Assignment";
// import Material from "../../lib/models/Material";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
          try {
        //   you will need to go from courses to populate lessons etc.
              const lessons = await Course.find({});
              console.log("lessons",lessons)
        res.status(200).json({ success: true, data: lessons });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
  }
}
