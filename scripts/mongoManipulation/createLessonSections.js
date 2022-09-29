/*
This script processes the list of lessons per course and creates sections objects for them as needed.
It also fixes the naming of the lessons and sections.
*/

const { mongoConnection, getConfigParam } = require("../utils.js");
const _ = require("lodash");

const extractAllSections = async () => {
  //for each course:
  //get all lessons
  //grab unique section names
  //create section object with name (left of :)
  //maintain order and reference from lesson
  //remove current section object in lesson
  const dbName = await getConfigParam("MONGODB_DB");

  const client = await mongoConnection();
  const db = client.db(dbName);

  try {
    const courses = await db.collection("courses").find({}).toArray();
    console.log(`found ${courses.length} courses`);
    const sectionCache = {};

    for (course of courses) {
      console.log(`processing course ${course._id}`);
      if (course.lessons.length === 0) {
        console.log(`no lessons found`);
        continue;
      }
      const lessons = await db
        .collection("lessons")
        .find({ _id: { $in: course.lessons } })
        .toArray();

      console.log(`found ${lessons.length} lessons`);

      for (lesson of lessons) {
        const section = {
          title: lesson.section_title[0].split(":")[1].trim(),
          order: parseInt(
            lesson.section_title[0].split(":")[0].replace(/^\D+/g, "")
          ),
          course: course._id,
        };

        const sectionKey = `${section.title}_${section.order}_${section.course}`;

        if (!sectionCache[sectionKey]) {
          const result = await db.collection("sections").insertOne(section);
          sectionCache[sectionKey] = section._id;
          console.log(`inserted new section with id ${section._id}`);
        } else {
          section._id = sectionCache[sectionKey];
        }

        result = await db
          .collection("lessons")
          .updateOne(
            { _id: lesson._id },
            { $set: { section: sectionCache[sectionKey] } }
          );
        console.log(`updated lesson ${lesson._id} with section ${section._id}`);
      }
    }
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    client.close();
  }
};

const run = async () => {
  await extractAllSections();

  console.log("all done");
  process.exit(0);
};

run();

