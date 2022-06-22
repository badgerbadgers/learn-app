const Airtable = require("airtable");
const airtable = new Airtable({ apiKey: process.env.AT_KEY });
const knowledgeBase = airtable.base(process.env.AIRTABLE_BASE_ID);

const getData = async (tableName) => {

  try {
    // Create the records constant to select all base resources from the items table
      const records = await knowledgeBase(tableName).select().all();
  
    // Then saved the records as data that is send as json file
    const data = JSON.parse(JSON.stringify(records));// cloning the response

    const minifyData = data.map((record) => {
      return {
        id: record.id,
        fields: record.fields,
      }
    })
    return (minifyData);
  } catch (error) {
    console.log(`Something went wrong :confused:!!  Error with ${tableName} data fetch`, error.message);
  }
};

export const getResourceData = () => getData("resources");























