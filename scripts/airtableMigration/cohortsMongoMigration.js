/*
This script is fetching cohorts from Airtable and inserting to mongo collection
*/

const { airtableConnection, insertToMongo } = require("../utils.js");

const getCohorts = async () => {
  const cohortData = [];
  const AtBase = await airtableConnection();
  await AtBase("Cohorts")
    .select({})
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        //check for name to make sure we don't process empty rows
        if (record.get("Name")) {
          let cohortObj = {
            cohort_name: record.get("Name"),
            start_date: new Date(record.get("StartDate")),
            course_airtableID:
              record.get("Course").length > 0 ? record.get("Course")[0] : null,
          };
          cohortData.push(cohortObj);
        }
      });
      fetchNextPage();
    })
    .catch((err) => {
      console.error(err);
    });

  return cohortData;
};

const main = async () => {
  const cohorts = await getCohorts();
  insertToMongo(cohorts, "cohorts");
};

main();

