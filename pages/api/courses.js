import Course from "../../lib/models/Course";
import dbConnect from "../../lib/dbConnect";


export default async function handler(req, res) {
    const { method } = req;
    await dbConnect()

    switch (method) {
        case "GET":
            return getCourses(req, res);
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getCourses = async (req, res) => {
    let courses = [];
    try {
        courses = await Course.find({}).select({ course_name: 1, _id: 1 });                
        res.status(200).json({ success: true, data: JSON.stringify(courses) })
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false })
      }
      return res
};