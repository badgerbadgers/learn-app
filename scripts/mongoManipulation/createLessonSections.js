/*
This script processes the list of lessons per course and creates sections objects for them as needed.
It also fixes the naming of the lessons and sections.
*/

//TODO: handle errors

const { mongoConnection, getConfigParam } = require("../utils.js");
const _ = require("lodash");

const extractAllSections = async () => {
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);

  try {
    //Get all courses
    const courses = await db.collection("courses").find({}).toArray();
    console.log(`found ${courses.length} courses`);

    for (const course of courses) {
      console.log(`processing course ${course._id}`);
      if (course.lessons.length === 0) {
        console.log(`no lessons found`);
        continue;
      }

      //get all lessons for course
      const lessons = await db
        .collection("lessons")
        .find({ _id: { $in: course.lessons } })
        .toArray();

      console.log(`found ${lessons.length} lessons`);

      for (const lesson of lessons) {
        //section_title has the following format:
        //Section <section number>: <section title>
        //We split the label at ":", then grab the section title from the text after ":"
        //and the number from the text before ":", split by "."
        const section = {
          title: lesson.section_title[0].split(":")[1].trim(),
          order: parseInt(
            lesson.section_title[0].split(":")[0].replace(/^\D+/g, "")
          ),
          course: course._id,
        };

        const sectionKey = `${section.title}_${section.order}_${section.course}`;

        //look for a matching section in the db
        const matchingSection = await db
          .collection("sections")
          .findOne(section);

        if (!matchingSection) {
          const result = await db.collection("sections").insertOne(section);
          console.log(`inserted new section with id ${section._id}`);
        } else {
          section._id = matchingSection._id;
          console.log(`found matching section ${section._id}`);
        }

        result = await db
          .collection("lessons")
          .updateOne({ _id: lesson._id }, { $set: { section: section._id } });
        console.log(`updated lesson ${lesson._id} with section ${section._id}`);
      }
    }
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await client.close();
  }
};

const run = async () => {
  await extractAllSections();

  console.log("all done");
  process.exit(0);
};

run();

