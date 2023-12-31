/**
 * @swagger
 *  tags:
 *   name: Courses
 * /api/v1/courses/{id}/lessons:
 *   get:
 *     description: Returns all course's lessons by the courses's id
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
 *         description: Provides a courses's data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course not found
 *   put:
 *     description: Updates a course's lessons
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
 *         name: Lessons
 *         description: An object with array of lessons' mongodb ids
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             lessons:
 *               type: array
 *               items:
 *                 type: string
 *           example: { "lessons": ["62e26dc669dd077fc82fbffa", "62e26dc669dd077fc82fc00b"]}
 *     responses:
 *       200:
 *         description: Provides course's updated lessons
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course  not found
 */
import Lesson from "lib/models/Lesson";
import Course from "lib/models/Course";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  
  try {
    switch (method) {
      case "GET":
        const data = await getLessons(id);
        if (!data) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find course with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data: data.lessons });
        break;
      case "PUT":
        const updatedCourse = await updateLessons(id, req.body);
        if (!updatedCourse) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find and update course with id - ${id}`;
          throw error;
        }
        res.status(200).json({ data: updatedCourse.lessons });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getLessons = async (id) => {
  await dbConnect();
  const data = await Course.findById(id, "lessons").populate("lessons").exec();
  if (!data) {
    return null;
  }
  return data;
};

export const updateLessons = async (id, updates) => {
  // return error if lessons ids array is not provided in updates
  if (
    !Object.keys(updates).length ||
    !updates.lessons ||
    !updates.lessons.length
  ) {
    throw new Error(
      "Lessons ids to perform an update for the course not provided"
    );
  }

  await dbConnect();

  // make sure provided lessons exist in db and create a list of non duplicated lessons ids
  const lessons = await Lesson.find(
    {
      _id: { $in: updates.lessons },
    },
    "_id"
  );
  // throw an error if not each lesson id provided is found in db
  if (!lessons) {
    throw new Error("All lessons ids provided must exist in the data base");
  }

  // check if each provided lesson exist in db
  const ifEveryExist = updates.lessons.every((lesson) =>
    lessons.find((lsn) => lsn._id.toString() === lesson)
  );
  // throw an error if not each lesson id provided is found in db
  if (!ifEveryExist) {
    throw new Error("All lessons ids provided must exist in the data base");
  }
  // make sure to not add duplicate lessons
  updates.lessons = lessons;

  // update course
  const updatedCourse = await Course.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { $set: { lessons: updates.lessons } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCourse) {
    return null;
  }

  const updatedCoursePopulate = await updatedCourse.populate("lessons");

  return updatedCoursePopulate;
};
