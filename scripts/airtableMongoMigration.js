getConfigParam = async (key) => {
    let param;
    const fs = require('fs');
    try {
        const data = await fs.promises.readFile('../.env.local', 'utf8');
        param = data.match(key)[1]; //TODO: handle index error
    } catch (err) {
        console.error(err);
    }
    return param;
}


const insertToMongo = async (doc, coll) => {
    const { MongoClient } = require("mongodb");
    // @param {<Object>} data 
    // @param {string} collection in Mongo

    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    console.log(uri, 'uri to mongo');
    const client = new MongoClient(uri);
    async function run() {
        try {
            await client.connect();
            const database = client.db('myFirstDatabase');
            console.log(database, "*****database befor insertion");
            const mongoCollectionName = database.collection(coll);
            const result = await mongoCollectionName.insertOne(doc);
            console.log(
                `A document was inserted with the _id: ${result.insertedId} `, //${result.insertedId}
            );
        } finally {
            // Ensures that the client will close when finish/error
            await client.close();
        }
    }
    run().catch(console.dir);

}
const getDataFromAirtable = async () => {
    const Airtable = require("airtable");
    const param = await getConfigParam(/AIRTABLE_TEST=(.+)/);
    const AtBase = new Airtable({ apiKey: param }).base('appXnj8G9efiiY9Ge'); //The ID of Class Mangement base

    let classesInfo = {}; //Cohorts cache
    AtBase('Classes').select({
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            classesInfo[record.id] = record.fields;
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    AtBase('Courses').select({
        view: "Default View",

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            let course = {
                course_name: record.get('Name'),
                airtable_id: record.id,
            }
            insertToMongo(course, 'courses')
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });



}

getDataFromAirtable();












// const { MongoClient } = require("mongodb");

// const uri = 'mongodb+srv://admin:tIaG5ePELrZa9QEd@cluster0.gpf3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const options = {}

// let client
// let clientPromise




// // if (process.env.NODE_ENV === 'development') {
// //   // In development mode, use a global variable so that the value
// //   // is preserved across module reloads caused by HMR (Hot Module Replacement).
// //   if (!global._mongoClientPromise) {
// //     client = new MongoClient(uri, options)
// //     global._mongoClientPromise = client.connect()
// //   }
// //   clientPromise = global._mongoClientPromise
// // } else {
// // In production mode, it's best to not use a global variable.
// client = new MongoClient(uri, options)
// clientPromise = client.connect()


// // }

// // TODO: 
// //pagination or max records check
// // validation content in AT fields 
// //replace name of fields with IDs 

// // const testTry = () => {
//     apiKey = 'keyKcjxZCjui9Pqki'
//     const Airtable = require("airtable");
//     const AtBase = new Airtable({ apiKey: apiKey }).base('appXnj8G9efiiY9Ge');
//     console.log('inside test try')

//     let classesInfo = {}; //Cohorts cache
//     AtBase('Classes').select({
//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//             classesInfo[record.id] = record.fields;
//         });
//         fetchNextPage();
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });



//     AtBase('Courses').select({
//         view: "Default View",

//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//             let course = {
//                 course_name: record.get('Name'),
//                 airtable_id: record.id,
//             }
//             // coursesToDb.push(course);
//             insertData(course, 'Courses')
//         });
//         fetchNextPage();

//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });



//     let ATtoMongoCourseCache = {}

//     const insertData = async (data, coll) => {
//         // @param {<Object>} data 
//         // @param {string} coll

//         const client = await clientPromise;
//         const db = client.db(process.env.MONGODB_DB);


//         try {
//             console.log("insert to Mongo", data)
//             const result = db
//                 .collection(coll)
//                 .updateOne({}, { $set: data }, { upsert: true }); //course_name: data.course_name
//             console.log('result = ', result)
//             ATtoMongoCourseCache[item.airtable_id] = result._id
//         }
//         catch (error) {
//             console.log(error, `Can't insert to db`);
//         } finally {
//             await client.close();
//         }
//     // };
//     // testTry()
//     console.log('after called test try')


// }
