const { airtableConnection } = require("../utils.js");
const upload = require("./insertToMongo");
// cohorts are already being fetched this script is just as a precausion
// This script is fetching cohorts from Airtable and inserting to mongo collection
const getCohorts = async () => {
 const cohortData = [];
 const AtBase = await airtableConnection();
  let classesInfo = {}; //Cohorts cache
  AtBase("Cohorts")
    .select({})
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        classesInfo[record.id] = record.fields;
        cohortData.push(record.fields)
        console.log(cohortData)
      });
      fetchNextPage();
    })
    .catch((err) => {
      console.error(err);
    });
  //array of assignment objs
  //   return cohortData;
};

const main = async () => {
  const cohorts = await getCohorts();
  upload(cohorts, "cohorts");
  //first paranm is obj second is coll name
};
main();
