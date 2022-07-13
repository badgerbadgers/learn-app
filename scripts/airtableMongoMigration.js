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
    const client = new MongoClient(uri);
    async function run() {
        try {
            await client.connect();
            const database = client.db('myFirstDatabase');
            const mongoCollectionName = database.collection(coll);
            const result = await mongoCollectionName.insertOne(doc); // TODO: filter + maybe pass filter to the func + upsert
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
    const param = await getConfigParam(/AT_KEY=(.+)/);

    const AtBase = new Airtable({ apiKey: param }).base('appN9Hf8KluRDBAN4'); //The ID of Class Mangement base

    // let classesInfo = {}; //Cohorts cache
    // AtBase('Cohorts').select({
    //     // view: "Grid view"
    // }).eachPage(function page(records, fetchNextPage) {
    //     records.forEach(function (record) {
    //         classesInfo[record.id] = record.fields;
    //     });
    //     fetchNextPage();
    // }, function done(err) {
    //     if (err) { console.error(err); return; }
    // });


    AtBase('Courses').select({
        // view: "Grid View",
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            if (record.get('Name')) { // in case if there is an empty row in the airtable
                let course = {
                    course_name: record.get('Name'),
                    airtable_id: record.id,
                }
                insertToMongo(course, 'courses')
            }
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

getDataFromAirtable();
