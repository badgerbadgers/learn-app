/*
This script is fetching assignments from Airtable and inserting to mongo collection
*/

const { airtableConnection, insertToMongo } = require("../utils.js");

const getAssignments = async () => {
  const assignmentData = [];
  const AtBase = await airtableConnection();
  await AtBase("Assignments")
    .select({})
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        //check for name to make sure we don't process empty rows
        if (record.get("Name")) {
          let assignmentObj = {
            assignment_title: record.get("Name"),
            link: record.get("Link"),
            assignment_airtableID: record.id,
          };
          assignmentData.push(assignmentObj);
        }
      });
      fetchNextPage();
    })
    .catch((err) => {
      console.error(err);
    });
  //array of assignment objs
  return assignmentData;
};

const main = async () => {
  const assignments = await getAssignments();
  insertToMongo(assignments, "assignments");
};
main();

