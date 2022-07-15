import { minifyItems } from "./minifyItems";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyhnwlabMnLCVxAV" }).base(
  "appN9Hf8KluRDBAN4"
); 
// replace keys with variables!!!!

// 1. fetch course data based on user's cohort they are assigned to 
// 2.section data (an array that holds an object)






const createAString = (array) => {
      let arrayID = "";
      array.forEach((recordID, index) => {
        arrayID += `RECORD_ID()='${recordID}'`;
        if (index < array.length - 1) {
          arrayID += ",";
        }
      });
      return arrayID;
    };
const getCourseData = async () => {
  try {
    const courseData = await base("Courses").select({ view: "Grid view" }).all();
    const materialsData = await base("Materials").select().all();
    const assignmentData = await base("Assignments").select().all();
  
    // fetching all the data from the tables
    const results = await Promise.all([
      courseData,
      materialsData,
      assignmentData,
    ]).then((result) => console.log(result));
    // returns an array of results 
    const data = JSON.parse(JSON.stringify(courseData));
    const minifyData = data.map((record) => {
      return {
        id: record.id,
        fields: record.fields,
      };
    });

    
   // for each index, arrayID holds a string of record_ID()= the recordID
    const section = minifyData[0].fields.Sections; 
    // use a condition for section rendering
    // const section = minifyData.map((record)=>{ 
    //   return{ 
    //     Sections:record.fields.Sections
    //   }
    // })
    console.log(section)
    // getting the section IDs 
 
    const sectionQuery = createAString(section);
    console.log(sectionQuery,"Danielle")
    // sectionQuery is the arrayID
    try{
      const lessonData = await base("Lessons").select({
        filterByFormula: sectionQuery,
      })
      .all();
      // fetching the lessonData
      // filtering by 
      // OR() returns true if sectionQuery argument is true
  console.log(lessonData,"hello");
    }catch(error){

    }
    
  
    console.log(sectionQuery,"Danielle");
    console.log(materialsData)

    return minifyData; 

    // remember coursedata is an array

    // const dataPromises = results.map(result => result.JSON.stringify(results))
    // // const retrieveData = await Promise.all(dataPromises)

    // const minifyData = dataPromises.map((record) => {
    //   return {
    //     id: record.id,
    //     fields: record.fields,
    //   };
    // });
    // return minifyData;
  } catch (error) {
    console.log(
      `Something went wrong :confused:!!  Error with  data fetch`,
      error.message
    );
  }
};

export { getCourseData };

// -----------------Below works (for only course table) ------------------------------------------

// const getCourseData = async () => {
//   try {
//     const courseData = await base("Courses")
//       .select({
//         // Selecting the first 3 records in Grid view:

//         view: "Grid view",
//       })
//       .all();

//     const data = JSON.parse(JSON.stringify(courseData));
//     const minifyData = data.map((record) => {
//       return {
//         id: record.id,
//         fields: record.fields,
//       };
//     });
//     return minifyData;
//   } catch (error) {
//     console.log(
//       `Something went wrong :confused:!!  Error with  data fetch`,
//       error.message
//     );
//   }
// };

//  export { getCourseData };
