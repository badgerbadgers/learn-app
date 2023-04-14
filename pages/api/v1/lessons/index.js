/**
 * @swagger
 * tags:
 *   name: Lessons
 * /api/v1/lessons:
 *   get:
 *     description: Returns all lessons
 *     tags: [Lessons]
 *     parameters:
 *        - in: query
 *          name: cohort
 *          type: string
 *          required: false
 *        - in: query
 *          name: course
 *          type: string
 *          required: false
 *     responses:
 *       200:
 *         description: Provides an array of lessons
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
      return;
    case "POST":
      try {
        //call method for creating a lesson with any data we received
        const lesson = await createLesson(req.body);
        res.status(200).json({ data: lesson });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getLessons = async () => {
  try {
    await dbConnect();

    const lessons = await Lesson.find();
    if (!lessons) {
      throw new Error("No lessons found");
    }
    return lessons;
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createLesson = async (data) => {
  const newLesson = new Lesson(data);
  const validationErr = await newLesson.validate();
  if (validationErr) {
    throw new Error(validationErr);
  }

  await dbConnect();
  //save the new lesson
  await newLesson.save();
  return newLesson;
};