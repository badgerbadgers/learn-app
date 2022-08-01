// import {getData} from "./getData";
import { MongoClient } from "mongodb";

// var Airtable = require("airtable");
// var base = new Airtable({ apiKey: process.env.AT_KEY  }).base(
//   process.env.AIRTABLE_COURSE_DATA_BASE_ID
// ); 


// ------------Mongo-------------------
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

 async function getMongoLessons(){ 
  try{ 
    var resultArray = [];
    await client.connect()
    const db = client.db('myFirstDatabase');
    const lessonColl = db.collection('lessons'); 

    const cursor = lessonColl.find({}, {projection:{ _id: 0 }}).sort({order:1}); 
    await cursor.forEach(lessonObj => console.log(resultArray.push(lessonObj)));
    // getting collections excluding id

  }catch{ 
    // Ensures that the client will close when you finish/error
    await client.close();
  }
   return resultArray
} 
console.log(getMongoLessons)

export {getMongoLessons} 


// ------------------Air Table--------------------

// const createAString = (array) => {
//       let arrayID = "";
//       array.forEach((recordID, index) => {
//         arrayID += `RECORD_ID()='${recordID}'`;
//         if (index < array.length - 1) {
//           arrayID += ",";
//         }
//       });
//       return arrayID;
//     };
// const getCourseData = async () => {
//   try {
//     const courseData = await base("Courses")
//       .select({ view: "Grid view" })
//       .all();
//     const materialsData = await base("Materials").select().all();
//     const assignmentData = await base("Assignments").select().all();

//     // fetching all the data from the tables
//     const results = await Promise.all([
//       courseData,
//       materialsData,
//       assignmentData,
//     ]).then((result) => console.log(result));
//     // returns an array of results
//     const data = JSON.parse(JSON.stringify(courseData));
//     const minifyData = data.map((record) => {
//       return {
//         id: record.id,
//         fields: record.fields,
//       };
//     });

//     // for each index, arrayID holds a string of record_ID()= the recordID
//     const section = minifyData[0].fields.Sections;
//     console.log(section);
//     // getting the section IDs

//     const sectionQuery = createAString(section);
//     console.log(sectionQuery, "Danielle");
//     // sectionQuery is the arrayID
//     try {
//       const lessonData = await base("Lessons")
//         .select({
//           filterByFormula: sectionQuery,
//         })
//         .all();
//       // fetching the lessonData
//       // filtering by

//       // console.log(lessonData);
//     } catch (error) {
//       `Something went wrong :confused:!!  Error with  data fetch`,
//         error.message;
//     }
//     console.log(sectionQuery);
//     console.log(materialsData);

//     return minifyData;
//   } catch (error) {
//     console.log(
//       `Something went wrong :confused:!!  Error with  data fetch`,
//       error.message
//     );
//   }
// };

// export { getCourseData };