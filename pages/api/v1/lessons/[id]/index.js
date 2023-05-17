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
  try {
    switch (method) {
      case "GET":
        const data = await getLesson(id);
        if (!data) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find lesson with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data });
        break;
      case "PATCH":
        const updatedLesson = await updateLesson(id, req.body);
        if (!updatedLesson) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find and update lesson with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data: updatedLesson });
        break;
      case "DELETE":
        await dbConnect();
        const deletedLesson = await deleteLesson(id);
        if (!deletedLesson) {
          return res
            .status(404)
            .json({ message: `Lesson with id ${id} not found` });
        }
        res.status(200).json();
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getLesson = async (id) => {
  await dbConnect();
  const data = await Lesson.findById(id); // returns lesson with deleted_at: null only
  if (!data) {
    return null;
  }
  return data;
};

// make sure provided ids exist in model db, return true if all ids exist in db, false otherwise
const confirmIdsExistInCollection = async (model, data) =>
  data.length === (await model.countDocuments({ _id: { $in: [...data] } }));

export const updateLesson = async (id, updates) => {
  // filter updates to extract allowed fields to perform update
  const filteredUpdates = {};

  if (updates.title) {
    filteredUpdates.title = updates.title;
  }

  if (updates.order) {
    filteredUpdates.order = updates.order;
  }

  if (updates.mindset_content) {
    filteredUpdates.mindset_content = updates.mindset_content;
  }

  if (updates.learning_objectives) {
    filteredUpdates.learning_objectives = updates.learning_objectives;
  }

  if (updates.deleted_at) {
    // check if deleted_at is a Date not null and do not let delete a lesson in PATCH )
    throw new Error("Not allowed to delete a lesson via PATCH method");
  }
  if (updates.deleted_at === null) {
    filteredUpdates.deleted_at = updates.deleted_at;
  }

  if (
    updates.submission_link &&
    (!updates.submission_link.label || !updates.submission_link.url)
  ) {
    throw new Error("Submission link must include label and valid url");
  }

  if (updates.submission_link) {
    filteredUpdates.submission_link = updates.submission_link;
  }

  await dbConnect();

  if (updates.materials) {
    const ifIdsExist = await confirmIdsExistInCollection(
      Material,
      updates.materials
    );

    if (!ifIdsExist) {
      throw new Error(
        `All materials ids provided must be unique and exist in the data base`
      );
    }
    filteredUpdates.materials = updates.materials;
  }

  if (updates.section) {
    const ifIdsExist = await confirmIdsExistInCollection(Section, [
      updates.section,
    ]);
    if (!ifIdsExist) {
      throw new Error(
        `Section id provided must be unique and exist in the data base`
      );
    }
    filteredUpdates.section = updates.section;
  }

  if (updates.assignments) {
    const ifIdsExist = await confirmIdsExistInCollection(
      Assignment,
      updates.assignments
    );
    if (!ifIdsExist) {
      throw new Error(
        `All assignments ids provided must be unique and exist in the data base`
      );
    }
    filteredUpdates.assignments = updates.assignments;
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
    return null;
  }
  await updatedLesson.save();
  const updatedLessonPopulate = await updatedLesson.populate(
    "materials assignments section"
  );

  return updatedLessonPopulate;
};

export const deleteLesson = async (id) => {
  const deletedLesson = await Lesson.findByIdAndUpdate(id, {
    deleted_at: new Date(),
  });
  if (!deleteLesson) {
    return null;
  }
  return deletedLesson;
};
