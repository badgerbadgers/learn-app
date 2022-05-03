const Airtable = require("airtable");

const projectBase = new Airtable({ apiKey: process.env.AT_KEY }).base(
  process.env.AIRTABLE_BASE_PROJECT_ID
);

const defaultBase = new Airtable({ apiKey: process.env.AT_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const getData = async (tableName) => {
  try {
    let records;
    // Create the records constant to select all base resources from the items table
    if (name != "Projects") {
      records = await defaultBase(tableName).select().all();
    } else {
      records = await projectBase("Projects").select({view: "Active"}).all();
    }
    // Then saved the records as data that is send as json file
    const data = JSON.parse(JSON.stringify(records));
    return data;
  } catch (error) {
    console.log(error);
    return {
      props: {
        err: "Something went wrong 😕",
      }
    };
  }
};

export const getZoneData = () => getData("Zones");
export const getResourceData = () => getData("resources");
export const getProjectsData = () => getData("Projects");

































