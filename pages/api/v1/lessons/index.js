/**
 * @swagger
 * tags:
 *   name: Lessons
 * /api/v1/lessons:
 *   get:
 *     description: Returns all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Provides an array of lessons
 *       400:
 *         description: Error messages
 *   post:
 *     description: Creates a new Lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: body
 *         name: lesson
 *         description: Create a new lesson
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *             submission_link:
 *               type: object
 *               required: [label, url]
 *               properties:
 *                 label:
 *                   type: string
 *                 url:
 *                   type: string
 *             learning_objectives:
 *               type: array
 *               items:
 *                 type: string
 *             mindset_content:
 *               type: string 
 *             materials:
 *               type: array
 *               items:
 *                 type: string         
 *             assignments:
 *               type: array
 *               items:
 *                 type: string 
 *             section:
 *               type: string
 *           example: {"title":"ThunderClient testing POST a lesson","submission_link": {"label":"Submit Assignment","url":"https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript"},"learning_objectives": ["Some text", "Some text"],"mindset_content": "Some text","materials":["62e26dc669dd077fc82fc010"],"assignments":["62e26dc569dd077fc82fbff2"],"section":"633d9915ec0d4b5e83a6b05e"}
 *     responses:
 *       200:
 *         description: Creates new lesson
 *       400:
 *         description: Error messages
 */

import Lesson from "lib/models/Lesson";
import Material from "lib/models/Material"; //not active but needed for populate()
import Assignment from "lib/models/Assignment"; //not active but needed for populate()
import Section from "lib/models/Section"; //not active but needed for populate()
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const lessons = await getLessons();
        res.status(200).json({ data: lessons });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const lesson = await createLesson(req.body);
        res.status(200).json({ data: lesson });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return;
}

export const getLessons = async () => {
  try {
    await dbConnect();
    const lessons = await Lesson.find({})
      .populate([
        {
          path: "materials",
          model: "Material",
        },
        {
          path: "assignments",
          model: "Assignment",
        },
        {
          path: "section",
          model: "Section",
        },
      ])
      .exec();

    return lessons;
  } catch (error) {
    throw new Error("Could not get lessons");
  }
};

// make sure provided ids exist in model db, return true if all ids exist in db, false otherwise
const confirmIdsExistInCollection = async (model, data) =>
  data.length === (await model.countDocuments({ _id: { $in: [...data] } }));

export const createLesson = async (data) => {
  const filteredData = {};
  if (data.title) {
    filteredData.title = data.title;
  }

  if (data.mindset_content) {
    filteredData.mindset_content = data.mindset_content;
  }

  if (data.learning_objectives) {
    filteredData.learning_objectives = data.learning_objectives;
  }

  if (
    data.submission_link &&
    (!data.submission_link.label || !data.submission_link.url)
  ) {
    throw new Error("Submission link must include label and valid url");
  }

  if (data.submission_link) {
    filteredData.submission_link = data.submission_link;
  }
  await dbConnect();

  if (data.materials) {
    const ifIdsExist = await confirmIdsExistInCollection(
      Material,
      data.materials
    );

    if (!ifIdsExist) {
      throw new Error(
        `All materials ids provided must be unique and exist in the data base`
      );
    }
    filteredData.materials = data.materials;
  }
  if (data.section) {
    const ifIdsExist = await confirmIdsExistInCollection(Section, [
      data.section,
    ]);
    if (!ifIdsExist) {
      throw new Error(
        `Section id provided must be unique and exist in the data base`
      );
    }
    filteredData.section = data.section;
  }

  if (data.assignments) {
    const ifIdsExist = await confirmIdsExistInCollection(
      Assignment,
      data.assignments
    );
    if (!ifIdsExist) {
      throw new Error(
        `All assignments ids provided must be unique and exist in the data base`
      );
    }
    filteredData.assignments = data.assignments;
  }

  if (Object.keys(filteredData).length === 0) {
    throw new Error("Valid data to create a new lesson not provided");
  }
  //run mongoose validator to make sure data is valid
  const newLesson = new Lesson(data);
  const validationErr = await newLesson.validate();
  if (validationErr) {
    throw new Error(validationErr);
  }

  //save the new lesson
  await newLesson.save();
  const newLessonPopulate = await newLesson.populate(
    "materials assignments section"
  );
  return newLessonPopulate;
};