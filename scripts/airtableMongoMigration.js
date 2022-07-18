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

    // const getHumanReadebleitem =(table, field, item) => {
    //     AtBase(table).select({
    //     for record that = []
    //     if (field.id == item){ 
    //          return record.get(field)
    //     }
    // });
    // }

    // using ^^ helper func to give record name instead of record id

    AtBase('Lessons').select({
        // view: “Grid View”, Is mine default?
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            // console.log(record)
            if (record.get('Title')  ) {  {} // in case if there is an empty row in the airtable
                let lessons = {
                    lesson_label: record.get('Label'),
                    order: record.get('Order'),
                    submission_link: record.get('Submit Link'),
                    // id: record.get('id'),
                    learning_objectives: record.get('Learning Objectives'),
                    mindset_content:record.get('Mindset Content')
                   
                }
                console.log(lessons)
                insertToMongo(lessons, 'lessons')
                // first param is obj name second is the name we want the collection to be called
            }
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });




}

getDataFromAirtable();