const Airtable = require("airtable");
const airtable = new Airtable({ apiKey: process.env.AT_KEY });
const knowledgeBase = airtable.base(process.env.AIRTABLE_BASE_ID);
const Base = airtable.base(process.env.AIRTABLE_COURSE_DATA_BASE_ID); 

const getData = async (tableName) => {
  // change to getAllCourseData
  let records = ""
  try {
    if(tableName=== "Lessons"){ 
       records = await Base(tableName).select({sort:[{field:'Start Date', direction:'asc'}]}).all()
      //  sorting the lesson data by the start date field and in ascending order
    }else if(tableName=== "Courses"){ 
       records = await Base(tableName).select({ view: "Grid view" }).all()
    }else{ 
      // Create the records constant to select all base resources from the items table
       records = await knowledgeBase(tableName).select().all();
    }
      
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
export const getlessonData = () => getData("Lessons")
export const getCourseData = () => getData("Courses")






















