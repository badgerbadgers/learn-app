/**
 * @swagger
 *  tags:
 *   name: Courses
 * /api/v1/courses/{id}/sections:
 *   get:
 *     description: Returns all course's sections by the course's id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Course id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e056cee6daad619e5cc2c3
 *     responses:
 *       200:
 *         description: Provides a course's sections
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course not found
 *   post:
 *     description: Creates a section for the course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Course id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e056cee6daad619e5cc2c3
 *       - in: body
 *         name: Section
 *         description: An object with a new section data
 *         required: true
 *         schema:
 *           type: object
 *           required: [title, course]
 *           properties:
 *             title:
 *               type: string
 *             order:
 *               type: number
 *           example: { "title": "React Hooks", "order": 3 }
 *     responses:
 *       200:
 *         description: Provides created section data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course not found
 */

import Course from "lib/models/Course";
import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  try {
    switch (method) {
      case "GET":
        const data = await getSections(id);
        if (!data) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find course with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data });
        break;
      case "POST":
        const sectionData = await createSection(id, req.body);
        if (!sectionData) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find course with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data: sectionData });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getSections = async (id) => {
  await dbConnect();
  const course = await Course.findById(id);
  if (!course) {
    return null;
  }
  return await Section.find({ course: id });
};

export const createSection = async (id, data) => {
  await dbConnect();
  const course = await Course.findById(id);
  if (!course) {
    return null;
  }
  // delete course if provided in data because we use course id from url path
  if (data.course) {
    delete data.course;
  }
  // throw an error if deleted_at set to anything but null
  if (data.deleted_at) {
    throw new Error("Cannot create deleted Section");
  }
  if (data.deleted_at === null) {
    delete data.deleted_at;
  }

  // return error if any data to create a section or title not provided
  if (!Object.keys(data).length || !data.title) {
    throw new Error(
      "Valid data to create a section for the course not provided"
    );
  }

  //make sure section title is unique
  const duplicateSectionTitle = await Section.findOne({
    title: data.title,
    course: id,
  });

  if (duplicateSectionTitle) {
    throw new Error("Duplicate Section Title");
  }
  // create a section
  const createdSection = await new Section({ ...data, course: id });
  await createdSection.save();
  return createdSection;
};
