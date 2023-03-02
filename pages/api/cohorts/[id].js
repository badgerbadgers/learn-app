/**
 * @swagger
 * /api/cohorts/{id}:
 *   get:
 *     description: Get the cohort by id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 635841bd9be844015c74719a
 *     responses:
 *       200:
 *         description: Get the cohort by id
 *       400:
 *         description: Error messages
 *   post:
 *     summary: in Progress
 *     description: Create the cohort by id
 *     tags: [Cohorts]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             cohortName: integer
 *             courseName: string
 *             startDate: date
 *           example:
 *             cohortName: Blue Fish
 *             courseName: 62e056cee6daad619e5cc2c3
 *             startDate: 2023-02-21T08:00:00.000Z
 *     responses:
 *       200:
 *         description: Create the cohort by id
 *       400:
 *         description: Error messages
 *   put:
 *     summary: in Progress
 *     description: Added schedule and start_date to the cohort
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: Update the cohort by id
 *       400:
 *         description: Error messages
 *   delete:
 *     description: Delete the cohort by id
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 632e0184290d23ac4c005e27
 *     responses:
 *       201:
 *         description: Delete the cohort by id
 *       400:
 *         description: Error messages
 */
import { createSchedule, sanitize } from "../cohorts";

import Cohort from "../../../lib/models/Cohort";
import Course from "../../../lib/models/Course";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../lib/models/User";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const cohort = await Cohort.findById(id).exec(); // API won't return cohorts with time stapm in property deleted_at
        res.status(200).json({ cohort: cohort });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const cohortToDb = await sanitize(JSON.parse(req.body.body));
        const existingCohortName = await Cohort.find({
          cohort_name: cohortToDb.cohort_name,
          _id: { $ne: cohortToDb._id }, // to exclude the current cohort
        });
        if (existingCohortName.lenght) {
          const error = {
            error: "Cohort name is not unique",
          };
          res.status(400).json({
            success: false,
            message: error,
          });
          return;
        }

        const checkCourseId = await Course.findById(cohortToDb.course);
        if (!checkCourseId) {
          const error = {
            error: "Course does not exist",
          };
          res.status(400).json({
            success: false,
            message: error,
          });
          return;
        }
        // if this ever becomes a bottleneck consider replasing the below findByIdAndUpdate
        // with proper cohort attributes update and call oldCohort.save()
        const oldCohort = await Cohort.findById(id);
        if (oldCohort.course.toString() !== cohortToDb.course.toString()) {
          cohortToDb.schedule = await createSchedule(cohortToDb.course);
        }
        const cohort = await Cohort.findByIdAndUpdate(id, cohortToDb, {
          runValidators: true,
          new: true,
        });

        if (!cohort) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: cohort });
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

    case "PUT":
      const [key, val] = req.body
      const allowedFields = ["schedule", "start_date", "students", "mentors"]
     if (allowedFields.indexOf(key) == -1) {
        console.error(`Update not Allowed for field ${key}`);
        res.status(400).json({ success: false });
        return
      }
      if (key == "schedule" || key == "start_date") {
        const data = {}
        data[key] = val;
        try {
          await Cohort.updateOne({ _id: id }, data);
          res.status(200).json({ success: true });
        } catch (error) {
          console.error("Update schedule error", error);
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true })
        break
      }
      return res.status(400).json({
        success: false,
        message: `Not allowed to update "${key}"`,
      });
      break;

    case "DELETE":
      try {
        const deletedCohort = await Cohort.findByIdAndUpdate(id, {
          deleted_at: new Date(),
        });
        if (!deletedCohort) {
          return res.status(400).json({ success: false });
        }
        res
          .status(201)
          .json({
            success: true,
            data: { deleted: deletedCohort.deletedCount },
          });
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

const addUsersToCohort = async ( id, key, val) => {
    const cohort = await Cohort.findById(id);
    if(!cohort){
      throw new Error("Cohort not found");
    }
    const users = await User.find({ _id: { $in: val } });
    users.map((user) => {
      if(!cohort[key].find(u => u.user.toString() === user._id.toString())){
        if( key == "students") {
          cohort[key].push({ user: user._id, added_at: new Date() });       
        } else {
          cohort[key].push({ user: user._id });
        }     
      }     
      
           
    });
    const updatedCohort = await cohort.save();
    return updatedCohort;
  
};