/*
This script is fetching courses and lessons from Airtable and inserting to mongo collection
*/
const { airtableConnection, insertToMongo } = require("../utils.js");

const getDataFromAirtable = async () => {
  const dataToMongo = [];
  const AtBase = await airtableConnection();
  await AtBase("Courses")
    .select({})
    .eachPage(function page(records, fetchNextPage) {
      console.log("Records #", records.length);
      records.forEach(function (record) {
        //check for name to make sure we don't process empty rows
        if (record.get("Name")) {
          let course = {
            course_name: record.get("Name"),
            airtable_id: record.id,
            lesson_airtable_ids: record.get("Lessons")
              ? record.get("Lessons")
              : [],
          };
          console.log("Course goes to mongo", course);
          dataToMongo.push(course);
        }
      });
      fetchNextPage();
    })
    .catch((err) => {
      //instead of done(err)
      console.error(err);
    });
  return dataToMongo;
};

const main = async () => {
  const toMongo = await getDataFromAirtable();
  await insertToMongo(toMongo, "courses");
  console.log("all done");
  process.exit(0);
};

main();

