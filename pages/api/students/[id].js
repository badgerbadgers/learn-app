import Userprofile from "../../../lib/models/Userprofile";
import Course from "../../../lib/models/Course";
import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";
import { sanitize } from "../students";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const student = await Userprofile.findById(id).exec();
        res.status(200).json({ student: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const studentToDb = await sanitize(JSON.parse(req.body.body));

        const existingStudentGithub = await Userprofile.find({
          gh: studentToDb.gh,
          _id: { $ne: id }, // to exclude the current cohort
        });
        if (existingStudentGithub.length) {
          const error = {
            error: "Student github is not unique",
          };
          res.status(400).json({
            success: false,
            message: error,
          });
          return;
        }

        const student = await Userprofile.findByIdAndUpdate(id, studentToDb, { runValidators: true, new: true });

        if (!student) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        console.log(error);
        const errors = {};
        Object.entries(error.errors).forEach(([k, v]) => {
          errors[k] = v.message;
        });
        return res.status(400).json({
          success: false,
          message: errors,
        });
      }
      break;

    case "DELETE":
      try {
        const deletedStudent = await Userprofile.findByIdAndUpdate(id, { deleted_at: new Date() });
        if (!deletedStudent) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: { deleted: deletedStudent.deletedCount } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
  return res;
}
