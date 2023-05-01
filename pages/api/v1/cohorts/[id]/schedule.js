/**
 * @swagger
 *  tags:
 *   name: Schedule
 * /api/v1/cohorts/{id}/schedule:
 *   get:
 *     description: Get schedule for a specific cohort
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: Cohort's id
 *         schema:
 *           type: string
 *         required: true
 *         example: 635841bd9be844015c74719a
 *     responses:
 *       200:
 *         description: Provides a cohort's schedule list
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort's schedule not found
 *   put:
 *     description: Update entire schedule for specific cohort
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 635841bd9be844015c74719a
 *       - in: body
 *         name: schedule
 *         description: An object with array of lessons
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - schedule
 *           properties:
 *             schedule:
 *             type: array
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [type, section]
 *                 properties:
 *                   type:
 *                     type: string
 *                   section:
 *                     type: string
 *                   lesson:
 *                     type: string
 *                   content:
 *                     type: string
 *           example: {"schedule": [
 *     { "type":"lesson",
 *       "lesson": "62e26dbb69dd077fc82fbfe5",
 *       "section": "633d9915ec0d4b5e83a6b05e"
 *     },
 *     {
 *       "type":"break",
 *       "content": "dfsfds",
 *       "section": "633d9915ec0d4b5e83a6b05e"
 *     },
 *   {
 *       "type":"review",
 *       "content": "kjlkjlkj",
 *       "section": "633d9915ec0d4b5e83a6b05e"
 *     }]}
 *     responses:
 *       200:
 *         description: Update entire schedule for a specific cohort
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort's schedule not found
 */

import Cohort from "lib/models/Cohort";
import Lesson from "lib/models/Lesson";
import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "GET":
      try {
        //Get a schedule for a specific cohort
        const schedule = await getCohortSchedule(id);
        res.status(200).json({ data: schedule });
      } catch (error) {
        console.error("Get cohort error", error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    case "PUT":
      const updates = req.body;
      try {
        const schedule = await updateSchedule(id, updates);
        res.status(200).json({ data: schedule });
      } catch (error) {
        console.error("Update cohort's schedule error", error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return;
}

export const getCohortSchedule = async (id) => {
  await dbConnect();
  const schedule = await Cohort.findById(id, "schedule")
    .populate([
      {
        path: "schedule",
        model: "Cohort",
        select: "lesson",
        populate: {
          path: "lesson",
          populate: [
            {
              path: "materials",
              model: "Material",
            },
            {
              path: "assignments",
              model: "Assignment",
            },
          ],
        },
      },
      {
        path: "schedule",
        model: "Cohort",
        populate: {
          path: "section",
          model: "Section",
        },
      },
    ])
    .exec();
  //if wrong id then throw error
  if (!schedule) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find cohort's schedule with id - ${id}`;
    throw error;
  }
  return schedule;
};

export const updateSchedule = async (id, updates) => {
  await dbConnect();
  if (Object.keys(updates).length === 0) {
    throw new Error(
      "No valid information was supplied to update the schedule of the cohort"
    );
  }
  // find all lesson's IDs in db
  const lessons = await Lesson.find(
    {
      lesson: {},
    },
    "_id"
  );
  const allLessonsIds = lessons.map((obj) => obj._id.toString());
  //check lesson's id in updates
  const filterLessonsInUpdates = updates.schedule.filter((obj) =>
    obj.hasOwnProperty("lesson")
  );
  const lessonsInUpdates = filterLessonsInUpdates.map((obj) => obj.lesson);
  //verify that lessons in updates exist in DB
  const lessonsExist = lessonsInUpdates.every((id) =>
    allLessonsIds.includes(id)
  );
  // throw an error if not each lesson id provided is found in db
  if (!lessonsExist) {
    throw new Error("Lesson's ID not found");
  }

  // find all section's IDs  in db
  const sections = await Section.find(
    {
      section: {},
    },
    "_id"
  );
  const allSectionsIds = sections.map((obj) => obj._id.toString());
  //check section's id in updates
  const sectionsInUpdates = updates.schedule.map((obj) => obj.section);

  //verify that sections in updates exist in DB
  const sectionsExist = sectionsInUpdates.every((id) =>
    allSectionsIds.includes(id)
  );
  // throw an error if not each section id provided is found in db
  if (!sectionsExist) {
    throw new Error("Section's ID not found");
  }
  //update
  const updatedSchedule = await Cohort.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedSchedule) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find and update cohort with id - ${id}`;
    throw error;
  }
  return updatedSchedule;
};