/**
 * @swagger
 *  tags:
 *   name: Cohorts
 * /api/v1/cohorts/{id}/schedule:
 *   get:
 *     description: Get schedule for a specific cohort
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Error message if a cohort not found
 *   put:
 *     description: Update entire schedule for specific cohort
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 635841bd9be844015c74719a
*       - in: body
 *         name: schedule
 *         description:  An object with the property 'schedule' with a value of an array of objects which contain either a type, a section mongo id, and a lesson mongo id OR a type, a section mongo id, and a content string
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - schedule
 *           properties:
 *             schedule:
 *               type: array
 *               items:
 *                 properties:
 *                    type: 
 *                       type: string
 *                    section: 
 *                       type: string
 *                    lesson: 
 *                       type: string
 *                    content: 
 *                       type: string
 *                 required: 
 *                   - type
 *                   - section
 *           example: {"schedule": [{ "type":"lesson", "lesson": "62e26dbb69dd077fc82fbfe5", "section": "633d9915ec0d4b5e83a6b05e"},{"type":"break","content": "Some content","section": "633d9915ec0d4b5e83a6b05e"},{"type":"review",      "content": "Some review text","section": "633d9915ec0d4b5e83a6b05e" }]}
 *     responses:
 *       200:
 *         description: Returns entire schedule for a specific cohort
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a cohort not found
 */

import Cohort from "lib/models/Cohort";
import Lesson from "lib/models/Lesson";
import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  try {
    switch (method) {
      case "GET":
        //Get a schedule for a specific cohort
        const schedule = await getCohortSchedule(id);
        if (!schedule) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find cohort with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data: schedule.schedule });
        return;
      case "PUT":
        const updates = req.body;
        const data = await updateSchedule(id, updates);
        if (!data) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find and update cohort with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data });
        return;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
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
    return null;
  }
  return schedule;
};
// make sure provided ids exist in model db, return true if all ids exist in db, false otherwise
const confirmIdsExistInCollection = async (model, data) =>
  data.length === (await model.countDocuments({ _id: { $in: [...data] } }));

export const updateSchedule = async (id, updates) => {
  if (!updates.schedule) {
    throw new Error("Schedule list is not provided");
  }
  await dbConnect();
  const filteredUpdates = await Promise.all(
    updates.schedule.map(async (item) => {
      //NOTE - checking if type and section provided is not even necessary here because mongoose will throw validation error anyway, but I like the error message better than the one sent from mongoose.
      if (!item.type) {
        throw new Error("Type is required for each schedule item");
      }
      if (!item.section) {
        throw new Error("Section id is required for each schedule item");
      }

      const ifSectionExist = await confirmIdsExistInCollection(Section, [
        item.section,
      ]);

      if (!ifSectionExist) {
        throw new Error(`Section id provided must exist in the data base`);
      }

      if (item.lesson) {
        const ifLessonExist = await confirmIdsExistInCollection(Lesson, [
          item.lesson,
        ]);

        if (!ifLessonExist) {
          throw new Error(`Lesson id provided must exist in the data base`);
        }
      }

      return item;
    })
  );

  if (Object.keys(filteredUpdates).length === 0) {
    throw new Error(
      "No valid information was supplied to update the schedule of the cohort"
    );
  }
  //update
  const updatedSchedule = await Cohort.findByIdAndUpdate(
    id,
    { schedule: filteredUpdates },
    {
      new: true,
      runValidators: true,
    }
  ).populate([
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
  ]);

  if (!updatedSchedule) {
    return null;
  }
  await updatedSchedule.save();

  return updatedSchedule.schedule;
};