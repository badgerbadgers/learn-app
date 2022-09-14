const { airtableConnection, insertToMongo } = require("../utils.js");

// This script is fetching materials from Airtable and inserting to mongo collection

const getMaterials = async () => {
  const materialData = [];
  const AtBase = await airtableConnection();
  await AtBase("Materials")
    .select({})
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        //check for name to make sure we don't process empty rows
        if (record.get("Name")) {
          let materialObj = {
            materials_title: record.get("Name"),
            materials_airtableID: record.id,
            source: record.get("Source"),
            url: record.get("URL"),
          };
          materialData.push(materialObj);
        }
      });
      fetchNextPage();
    })
    .catch((err) => {
      console.error(err);
    });
  //array of material obj
  return materialData;
};

const main = async () => {
  const materials = await getMaterials();
  insertToMongo(materials, "materials");
};

main();

