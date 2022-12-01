const { ObjectId } = require("mongodb");

import Userprofile from "../../../lib/models/Userprofile";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../lib/models/User";
import Course from "../../../lib/models/Course";
import Cohort from "../../../lib/models/Cohort";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      return await getStudents(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getStudents = async (req, res) => {
  let students = [];

  try {
    students = await Userprofile.find({})
      .select("firstName lastName gh email createdAt")
      .populate({ path: "userId", model: "User", select: "roleIds" })
      .populate({ path: "cohort", model: "Cohort", select: "cohort_name", populate: { path: "course", model: "Course", select: "course_name" } })
      .exec();
    res.status(200).json({ success: true, data: JSON.stringify(students) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
  return res;
};

