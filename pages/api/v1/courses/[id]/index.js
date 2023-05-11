/**
 * @swagger
 *  tags:
 *   name: Courses
 * /api/v1/courses/{id}:
 *   get:
 *     description: Returns a course data by the courses's id
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
 *   patch:
 *     description: Updates a course's data
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
 *         name: Course data
 *         description: An object with all or any of the properties - course_name or lessons
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             course_name:
 *               type: string
 *             deleted_at:
 *               type:
 *                 - 'null'
 *             lessons:
 *               type: array
 *               items:
 *                 type: string
 *           example: {"course_name": "Some course name", "lessons": ["62e26dc669dd077fc82fbffa", "62e26dc669dd077fc82fc00b"], "deleted_at": null}
 *     responses:
 *       200:
 *         description: Provides a course's data
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course not found
 *   delete:
 *     description: Deletes a course by the course's id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         description: Course id
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 62e056cee6daad619e5cc2c4
 *     responses:
 *       200:
 *         description: Deletes a course by id
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if a course not found
 */

// TODO - swagger - change description if anything returns from DELETED request
import Lesson from "lib/models/Lesson";
import Course from "lib/models/Course";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "GET":
      try {
        const data = await getCourse(id);
        res.status(200).json({ data });
      } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    case "PATCH":
      try {
        const updatedCourse = await updateCourse(id, req.body);
        res.status(200).json({ data: updatedCourse });
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await dbConnect();
        const deletedCourse = await Course.findByIdAndUpdate(id, {
          deleted_at: new Date(),
        });
        if (!deletedCourse) {
          return res
            .status(404)
            .json({ message: `Course with id ${id} not found` });
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
  return res;
}

export const getCourse = async (id) => {
  await dbConnect();
  const data = await Course.findById(id); // returns course with deleted_at: null only
  if (!data) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find course with id - ${id}`;
    throw error;
  }
  return data;
};

export const updateCourse = async (id, updates) => {
  //  allowed fields to update are: "course_name", "lessons", "deleted_at"];
  const filteredUpdates = {};

  if (updates.deleted_at) {
    throw new Error("Not allowed to update deleted_at to non null value");
  }

  await dbConnect();
  
  if (updates.course_name) {
    //make sure course_name is unique
    const duplicateCourseName = await Course.findOne({
      course_name: updates.course_name,
    });

    if (duplicateCourseName) {
      throw new Error("Duplicate Course Name");
    }
    filteredUpdates.course_name = updates.course_name;
  }
  
  if (updates.deleted_at === null) {
 
    if (!updates.course_name) {
      //make sure course_name is unique
      const [course] = await Course.find({
        _id: id,
        deleted_at: { $ne: null },
      });
  
      if (course) {
        const duplicateCourseName = await Course.findOne({
          course_name: course.course_name,
        });
        if (duplicateCourseName) {
          throw new Error(
            "Not allowed: undeleting the course will create duplicate course name"
          );
        }
      }
    }
    filteredUpdates.deleted_at = updates.deleted_at;
  }

  // make sure provided lessons exist in db
  if (updates.lessons) {
    // find which of the provided lessons exist in lessons database, if not - throw an error
    const lessons = await Lesson.find(
      {
        _id: { $in: updates.lessons },
      },
      "_id"
    );
    // throw an error if not each lesson id provided is found in db
    if (!lessons.length || updates.lessons.length !== lessons.length) {
      throw new Error(
        "All lessons ids provided must be unique and exist in the data base"
      );
    }
    filteredUpdates.lessons = lessons;
  }

  // return error if there are no valid fields to update
  if (Object.keys(filteredUpdates).length === 0) {
    throw new Error(
      "Valid data to perform an update for the course not provided"
    );
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, filteredUpdates, {
    new: true,
    runValidators: true,
  });

  if (!updatedCourse) {
    const error = new Error();
    error.status = 404;
    error.message = `Could not find and update course with id - ${id}`;
    throw error;
  }
  const updatedCoursePopulate = await updatedCourse.populate("lessons");

  return updatedCoursePopulate;
};
