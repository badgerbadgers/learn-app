const { airtableConnection, insertToMongo } = require("../utils.js");

// This script is fetching lessons from Airtable and inserting to mongo collection

const getLessons = async () => {
  const lessonData = [];
  const AtBase = await airtableConnection();
  await AtBase("Lessons")
    .select({})
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        if (record.get("Title")) {
          // in case if there is an empty row in the airtable
          let lessonObj = {
            lesson_label: record.get("Label"),
            order: record.get("Order"),
            submission_link: record.get("Submit Link"),
            learning_objectives: record.get("Learning Objectives"),
            mindset_content: record.get("Mindset Content"),
            assignment_airtableID: record.get("Assignment"),
            materials_airtableID: record.get("Materials"),
            section_title: record.get("Label (from Section)"),
          };
          lessonData.push(lessonObj);
        }
      });
      fetchNextPage();
    })
    .catch((err) => {
      console.error(err);
    });
  //array of lesson objs
  return lessonData;
};

const main = async () => {
  const lessons = await getLessons();
  insertToMongo(lessons, "lessons");
};

main();

