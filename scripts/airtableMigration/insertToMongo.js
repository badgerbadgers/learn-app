const { mongoConnection } = require("../utils.js");

// This script inserts collection into mongo and is filtered for different collections

const collectionFilterField = { // Filters mapping  for reusing func insertToMongo with different collections
    "courses": "course_name",
    "cohorts": "cohort_name",
    "assignments":"assignment_title", 
    "lessons":"lesson_label",
    "materials":"materials_title"

};

exports.insertToMongo = async (data, coll) => {
    // @param {<Object>} data 
    // @param {string} collection in Mongo

    const client = await mongoConnection()
    async function run() {
        try {
            const database = client.db("myFirstDatabase");
            const mongoCollectionName = database.collection(coll);
            // data.forEach(doc => mongoCollectionName.insertOne(doc)); 
            data.forEach(doc => {
                const filter ={};
                //matching filtered collection and field to document collection
                filter[collectionFilterField[coll]] = doc[collectionFilterField[coll]]
                mongoCollectionName.updateOne(filter, {$set: doc}, { upsert: true })
            }); 
            console.log(
                `A document was inserted with the _id: ${result.insertedId} `, 
            );
        } finally {
            // Ensures that the client will close when finish/error
            // await client.close();
        }
    }
    run().catch(console.dir);
 }