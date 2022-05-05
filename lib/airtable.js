const Airtable = require("airtable");
//const {AT_KEY, AIRTABLE_BASE_ID, AIRTABLE_BASE_PROJECT_ID} = process.env

const projectBase = new Airtable({ apiKey: 'keyhnwlabMnLCVxAV' }).base(
  'appQSPi3XUdUMbM1m'
);

// const defaultBase = new Airtable({ apiKey: AT_KEY }).base(
//  AIRTABLE_BASE_ID
// );

const getData = async (tableName) => {
  try {
    let records;
    // Create the records constant to select all base resources from the items table
    if (tableName === "Projects") {
      console.log('**************Entered');
      records = await projectBase("Projects").select({view: "Active"}).all();
      console.log(records);
     } else if (tableName === "People") {
      records = await projectBase("Projects").select({view: "Apprentices Only"}).all();
    }
    else {
      records = await defaultBase(tableName).select().all();
    }
    // Then saved the records as data that is send as json file
    const data = JSON.parse(JSON.stringify(records));// cloning the response
    return data;
  } catch (error) {
    console.log(`Something went wrong 😕!!  Error with ${tableName} data fetch`, error.message);
  }
};

export const getZoneData = () => getData("Zones");
export const getResourceData = () => getData("resources");
export const getProjectsData = () => getData("Projects");
export const getDevelopersData = () => getData("People");































