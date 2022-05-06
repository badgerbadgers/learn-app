const Airtable = require("airtable");
const airtable = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AT_KEY })
const projectBase = airtable.base(process.env.AIRTABLE_BASE_PROJECT_ID);
const knowledgeBase = airtable.base(process.env.AIRTABLE_BASE_ID);

const getData = async (tableName) => {
  try {
    let records;
    // Create the records constant to select all base resources from the items table
    if (tableName === "Projects") {
      records = await projectBase("Projects").select({view: "Active"}).all();
     }
     else if (tableName === "People") {
      records = await projectBase("People").select({view: "Apprentices Only"}).all();
     }
    else { 
      records = await knowledgeBase(tableName).select().all();
    }
    // Then saved the records as data that is send as json file
    const data = JSON.parse(JSON.stringify(records));// cloning the response
    return data;
  } catch (error) {
    console.log(`Something went wrong :confused:!!  Error with ${tableName} data fetch`, error.message);
  }
};
export const getZoneData = () => getData("Zones");
export const getResourceData = () => getData("resources");
export const getProjectsData = () => getData("Projects");
export const getDevelopersData = () => getData("People");




























