const Airtable = require("airtable");

const projectBase = new Airtable({ apiKey: process.env.AT_KEY }).base(
  process.env.AIRTABLE_BASE_PROJECT_ID
);

const defaultBase = new Airtable({ apiKey: process.env.AT_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export const getZoneData = async () => {
try {
  const records = await defaultBase("Zones").select().all();
  const data = JSON.parse(JSON.stringify(records));
  return data;
} catch (e) {
  console.log("ERROR with ZONES FETCH", e.message);
}
};

export const getResourceData = async () => {
  try {
    // Create the records constant to select all base resources from the items table
    const records = await defaultBase("resources").select().all();
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

export const getProjectsData = async () => {
  try {
    const records = await projectBase("Projects").select({view: "Active"}).all();
    const data = JSON.parse(JSON.stringify(records));
    return data;
  } catch (e) {
    console.log("ERROR with ZONES FETCH", e.message);
  }
};
































