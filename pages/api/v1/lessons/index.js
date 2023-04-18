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
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *     responses:
 *       200:
 *         description: Creates new lesson
 *       400:
 *         description: Error messages
 */

import Lesson from "lib/models/Lesson";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        //call method for getting lessons with any parameters we received
        const lessons = await getLessons(req.query);
        res.status(200).json({ data: lessons });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        //call method for creating a lesson with any data we received
        const lesson = await createLesson(req.body);
        res.status(200).json({ data: lesson });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  return res;
}

export const getLessons = async () => {
  await dbConnect();
  const lessons = await Lesson.find();
  if (!lessons) {
    throw new Error("No lessons found");
  }
  return lessons;
};

export const createLesson = async (data) => {
  await dbConnect();
  if (Object.keys(data).length === 0) {
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
  return newLesson;
};