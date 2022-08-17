const Airtable = require("airtable");
const { MongoClient } = require("mongodb");

const getConfigParam = async (key) => { // prevent exposing keys
    let param;
    const fs = require("fs");
    try {
        const data = await fs.promises.readFile("../.env.local", "utf8");
        param = data.match(key)[1]; //TODO: handle possible index error
    } catch (err) {
        console.error(err);
    }
    return param;
}  


const collectionFilterField = { // Filters mapping  for reusing func insertToMongo with different collections
    "course": "course_name",
    "cohorts": "cohort_name",
};

const insertToMongo = async (data, coll) => {
    // @param {<Object>} data 
    // @param {string} collection in Mongo

    const uri = await getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    const filter = {};
    async function run() {
        try {
            await client.connect();
            const database = client.db("myFirstDatabase");
            const mongoCollectionName = database.collection(coll);
            // data.forEach(doc => mongoCollectionName.insertOne(doc)); 
            data.forEach(doc => {
                const filter = {};
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


const getLessons = async () => {
    const param = await getConfigParam(/AT_KEY=(.+)/);
    const AtBase = new Airtable({ apiKey: param }).base("appN9Hf8KluRDBAN4"); //The ID of Class Mangement base
    const lessonTitles = {};
    await AtBase("Lessons").select({
    }).eachPage(function page(records, fetchNextPage) {    
        records.forEach((item) => {
            lessonTitles[item.id] = item.get("Title")
        });
        fetchNextPage();
    }).catch(err => {
        console.error(err);
    });
    return lessonTitles;
}


const getDataFromAirtable = async (lessonsCache) => {
    const dataToMongo = []
    const Airtable = require("airtable");
    const param = await getConfigParam(/AT_KEY=(.+)/);
    const AtBase = new Airtable({ apiKey: param }).base("appN9Hf8KluRDBAN4"); //The ID of Class Mangement base

    await AtBase("Courses").select({
    }).eachPage(function page(records, fetchNextPage) {
        console.log("Records #", records.length);
        records.forEach(function (record) {
            if (record.get("Name")) {  // in case if there is an empty row in the airtable              
                let course = {
                    course_name: record.get("Name"),
                    airtable_id: record.id,
                    lessons: record.get("Lessons")?.map(lesson => lessonsCache[lesson]) || [],
                }
                console.log("Course goes to mongo", course);
                dataToMongo.push(course)
            }
        });
        fetchNextPage();
    }, 

    ).catch(err => { //instead of done(err)
        console.error(err);
    });
    return dataToMongo;
}

const main =async () => {
    const lessons = await getLessons();
    const toMongo = await getDataFromAirtable(lessons);
    insertToMongo(toMongo, "course"); // change the name of collection manually 
}

main();
// export { getConfigParam}