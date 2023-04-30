/**
 * @swagger
 *  tags:
 *   name: Lessons
 * /api/v1/lessons/{id}:
 *   get:
 *     description: Returns a lesson data by the lesson's id
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Lesson id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e26dc669dd077fc82fbffa
 *     responses:
 *       200:
 *         description: Provides a lesson's data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if the lesson not found
 *   patch:
 *     description: Updates a lesson's data
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Lesson id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e26dc669dd077fc82fbffa
 *       - in: body
 *         name: Lesson data
 *         description: An object with lesson data
 *         required: true
 *         schema:
 *           type: object
 *           required: [title]
 *           properties:
 *             title:
 *               type: string
 *             order:
 *               type: number
 *             submission_link:
 *               type: object
 *               required: [label, url]
 *               properties:
 *                  label:
 *                   type: string
 *                  url:
 *                   type: string
 *             learning_objectives:
 *                type: array
 *                items:
 *                 type: string
 *             mindset_content:
 *                 type: string
 *             materials:
 *                type: array
 *                items:
 *                 type: string
 *             assignments:
 *                 type: array
 *                 items:
 *                  type: string
 *             section:
 *                 type: string
 *             deleted_at:
 *                 type: 'null'
 *           example: {"title": "JavaScript Arrays", "order": 3.2, "submission_link": { "label": "Submit Assignment", "url": "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=HTML Basics"},"learning_objectives": ["Learn everything", "Learn JavaScript arrays"], "mindset_content": "For many, failure has become deeply engrained in us as something to avoid. And for that reason, as you’re learning to code, you may find that your gut response to bright red error messages or long stack traces is one of fear, anger, or frustration. But we’ll let you in on a little secret—those error messages and stack traces are a gift.", "materials": ["62e26db569dd077fc82fbfce","62e26dbb69dd077fc82fbfed"], "assignments": ["62e26dc669dd077fc82fc002", "62e26dc569dd077fc82fbff4"], "section": "633d9916ec0d4b5e83a6b062", deleted_at: null}
 *     responses:
 *       200:
 *         description: Provides a lesson's data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a lesson not found
 *   delete:
 *     description: Deletes a lesson by the lesson's id
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         description: Lesson id
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e26dc669dd077fc82fbffa
 *     responses:
 *       200:
 *         description: Deletes a lesson by id
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a lesson not found
 */

// TODO - swagger - change description if anything returns from DELETED request
import Lesson from "lib/models/Lesson";
import Assignment from "lib/models/Assignment";
import dbConnect from "lib/dbConnect";
import Material from "lib/models/Material";
import Section from "lib/models/Section";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "GET":
      try {
        const data = await getLesson(id);
        res.status(200).json({ data });
      } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    case "PATCH":
      try {
        const updatedLesson = await updateLesson(id, req.body);
        res.status(200).json({ data: updatedLesson });
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await dbConnect();
        const deletedLesson = await Lesson.findByIdAndUpdate(id, {
          deleted_at: new Date(),
        });
        if (!deletedLesson) {
          return res
            .status(404)
            .json({ message: `Lesson with id ${id} not found` });
        }
        res.status(200).json();
      } catch (error) {
        console.log(error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getLesson = async (id) => {
  await dbConnect();
  const data = await Lesson.findById(id); // returns lesson with deleted_at: null only
  if (!data) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find lesson with id - ${id}`;
    throw error;
  }
  return data;
};

// make sure provided ids exist in model db
const foundInDataBase = async (model, data) => {
  // find which of the provided ids exist in model database, if not - throw an error
  const idList = await model.find({ _id: { $in: [...data] } }, "_id");
  // throw an error if not each id provided is found in db
  if (!idList.length || data.length !== idList.length) {
    throw new Error(
      `All ${model.modelName} ids provided must be unique and exist in the data base`
    );
  }
  return idList.map((item) => item._id);
};

export const updateLesson = async (id, updates) => {
  // filter updates to extract allowed fields to perform update
  const allowedFields = [
    "title",
    "order",
    "submission_link",
    "learning_objectives",
    "mindset_content",
    "materials",
    "assignments",
    "section",
    "deleted_at",
  ];
  const filteredUpdates = allowedFields.reduce((fields, current) => {
    if (current === "deleted_at" && updates[current] === null) {
      return { ...fields, [current]: updates[current] };
    }
    if (current === "deleted_at" && updates[current]) {
      // check if deleted_at is a Date not null and do not let delete a lesson in PATCH )
      throw new Error("Not allowed to delete a lesson via PATCH method");
      //  return fields;
    }
    if (
      current === "submission_link" &&
      updates[current] &&
      (!updates[current].label || !updates[current].url)
    ) {
      throw new Error("Submission link must include label and valid url");
    }
    if (updates[current]) {
      return { ...fields, [current]: updates[current] };
    }
    return fields;
  }, {});

  if (!filteredUpdates.title) {
    throw new Error("Title is required to update a lesson");
  }

  await dbConnect();

  if (filteredUpdates.materials) {
    filteredUpdates.materials = await foundInDataBase(
      Material,
      filteredUpdates.materials
    );
  }

  if (filteredUpdates.section) {
    const [section] = await foundInDataBase(Section, [filteredUpdates.section]);
    filteredUpdates.section = section;
  }

  if (filteredUpdates.assignments) {
    filteredUpdates.assignments = await foundInDataBase(
      Assignment,
      filteredUpdates.assignments
    );
  }

  // return error if there are no valid fields to update
  if (Object.keys(filteredUpdates).length === 0) {
    throw new Error(
      "Valid data to perform an update for the course not provided"
    );
  }
  const updatedLesson = await Lesson.findByIdAndUpdate(id, filteredUpdates, {
    new: true,
    runValidators: true,
  });
  if (!updatedLesson) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find and update lesson with id - ${id}`;
    throw error;
  }
  await updatedLesson.save();
  const updatedLessonPopulate = await updatedLesson.populate(
    "materials assignments section"
  );

  return updatedLessonPopulate;
};
