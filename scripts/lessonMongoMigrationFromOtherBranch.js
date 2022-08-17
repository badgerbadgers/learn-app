import { getConfigParam } from "./airtableMongoMigration";
 
 
const insertToMongo = async (doc, coll) => {
    const { MongoClient } = require("mongodb");
    // @param {<Object>} data
    // @param {string} collection in Mongo
 
    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    async function run() {
        try {
            await client.connect();
            const database = client.db('myFirstDatabase');
            const mongoCollectionName = database.collection(coll);
            const options = { upsert: true }; //if no document exists create one
            const result = await mongoCollectionName.updateOne(doc,options); // TODO: filter + maybe pass filter to the func + upsert
            console.log(
                `A document was updated with the  ${result} `, //${result.insertedId}
            );
        } finally {
            // Ensures that the client will close when finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
 
}
// const getDataFromAirtable = async () => {
//     const Airtable = require("airtable");
//     const param = await getConfigParam(/AT_KEY=(.+)/);
 
//     const AtBase = new Airtable({ apiKey: param }).base('appN9Hf8KluRDBAN4'); //The ID of Class Mangement base
 
//     // let classesInfo = {}; //Cohorts cache
//     // AtBase('Cohorts').select({
//     //     // view: "Grid view"
//     // }).eachPage(function page(records, fetchNextPage) {
//     //     records.forEach(function (record) {
//     //         classesInfo[record.id] = record.fields;
//     //     });
//     //     fetchNextPage();
//     // }, function done(err) {
//     //     if (err) { console.error(err); return; }
//     // });
 
 
//     AtBase('Courses').select({
//         // view: "Grid View",
//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//             if (record.get('Name')) { // in case if there is an empty row in the airtable
//                 let course = {
//                     course_name: record.get('Name'),
//                     airtable_id: record.id,
//                 }
//                 // insertToMongo(course, 'courses')
//             }
//         });
//         fetchNextPage();
 
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });
 
 

 
// ------------material Data----------
async function getMaterials() {
    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    await client.connect();
    let results = [];
    const db = client.db('myFirstDatabase');
    try {
        results = db
          .collection("lessons")
          .aggregate([
            {
              $lookup: {
                from: "materials",
                localField: "materials_airtableID",
                foreignField: "materials_airtableID",
                as: "materials_data",
                pipeline: [
                  {
                    $project: {
                        _id:0,
                      materials_title: { $toString: "$materials_title" },
                      source: { $toString: "$source" },
                      url: { $toString: "$url" },
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
        //   console.log('RESULTS', results)
        // results.then()
       
    } catch (e) {
        console.log('ERROR', e.message)
    }
    return results
  }
  const materialsData =  getMaterials()
  materialsData.then( async res => {
    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('myFirstDatabase');
    res.forEach(lesson => {
        const materialsDataArray = []
        lesson.materials_data.forEach(material => {
            materialsDataArray.push( material)
        })
        // console.log('new array', lesson.lesson_label, lesson._id, materialsDataArray)
     
        db.collection('lessons').updateOne(
            {_id: lesson._id},
            {$set: {
                materials_Data: materialsDataArray
            }
            }
        )
    })
  })
 
 
  // ------------assignment Data----------
async function getAssignments() {
    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    await client.connect();
    let results = [];
    const db = client.db('myFirstDatabase');
    try {
        results = db
          .collection("lessons")
          .aggregate([
            {
              $lookup: {
                from: "assignments",
                localField: "assignment_airtableID",
                foreignField: "assignment_airtableID",
                as: "assignment_data",
                pipeline: [
                  {
                    $project: {
                        _id:0,
                      assignment_title: 1,
                     link:1,
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
        //   console.log('RESULTS', results)
        // results.then()
       
    } catch (e) {
        console.log('ERROR', e.message)
    }
    return results
  }
  const assignmentData =  getAssignments()
  assignmentData.then( async res => {
    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('myFirstDatabase');
    res.forEach(lesson => {
        const assignmentDataArray = []
        lesson.assignment_data.forEach(assignment => {
           assignmentDataArray.push( assignment)
        })
        // console.log('new array', lesson.lesson_label, lesson._id, assignmentDataArray)
     
        db.collection('lessons').updateOne(
            {_id: lesson._id},
            {$set: {
                assignment_Data:assignmentDataArray
            }
            }
        )
    })
  })
 
 
     
const string2array = async () => {
  const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
  const client = new MongoClient(uri);
  let results = [];
  await client.connect();
  const db = client.db("myFirstDatabase");
  try {
    const lessonsArray = await db.collection("lessons").find().toArray(); //source = lessons coll, lessonsArray = array
 
    for (let i = 0; i < lessonsArray.length; i++) {
      let lesson = lessonsArray[i];
 
      let objectives = lesson.learning_objectives;
 
      if (typeof objectives === "string") {
        objectivesArray = objectives
          .split("-")
          .map((element) => element.trim());
        objectivesArray.shift();
        results=objectivesArray;
       
      }
      console.log(results)
      await db.collection("lessons").updateOne(
      { _id: lesson._id },
      {
        $set: {
          learning_objectives: results
        },
      }//inside the for since we want for every lesson
    );
    }
   
  } catch (e) {
    console.log("ERROR", e.message);
  }
  //  return results.push(lesson, "array test")
};
string2array();
 
 
 
 
//     AtBase('Lessons').select({
//         // view: “Grid View”, Is mine default?
//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//             // console.log(record)
//             if (record.get('Title')  ) {  {} // in case if there is an empty row in the airtable
//                 let lessons = {
//                     lesson_label: record.get('Label'),
//                     order: record.get('Order'),
//                     submission_link: record.get('Submit Link'),
//                     // id: record.get('id'),
//                     learning_objectives: record.get('Learning Objectives'),
//                     mindset_content:record.get('Mindset Content'),
//                     assignment_airtableID: record.get('Assignments'),
//                     materials_airtableID: record.get('Materials'),
//                     section_title:record.get('Label (from Section)')

//                 }
//                   console.log(lessons)
//                 insertToMongo()
//                 // first param is obj name second is the name we want the collection to be called
//             }
//         });
//         fetchNextPage();
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });
 
 
//     AtBase('Assignments').select({
//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//             if (record.get('Name')  ) {  {} // in case if there is an empty row in the airtable
//                 let assignments = {
//                     assignment_title:record.get('Name'),
//                     link:record.get('Link'),
//                     assignment_airtableID:record.id
//                 }
//                 // console.log(assignments)
//                 // insertToMongo(assignments, 'assignments')
//             }
//         });
//         fetchNextPage();
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });
 
//     AtBase('Materials').select({
//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//             if (record.get('Name')  ) {  {} // in case if there is an empty row in the airtable
//             // console.log(record.id)
//                 let materials = {
//                     materials_title:record.get('Name'),
//                     materials_airtableID:record.id,
//                     source:record.get('Source'),
//                     url:record.get('URL')
 
//                 }
//                 //  console.log(materials)
//                 // insertToMongo(materials, 'materials')
//             }
//         });
//         fetchNextPage();
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });
 
   
// }
 
// getDataFromAirtable();

