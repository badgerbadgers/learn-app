const utils = require("../utils");
const upload = require("./insertToMongo");
// cohorts are already being fetched this script is just as a precausion
// This script is fetching cohorts from Airtable and inserting to mongo collection
const getCohorts = async () => {
 const cohortData = [];
  const Airtable = require("airtable");
  const param = await utils.getConfigParam(/AT_KEY=(.+)/);
  const AtBase = new Airtable({ apiKey: param }).base("appN9Hf8KluRDBAN4");
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
