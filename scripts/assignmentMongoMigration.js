import { getConfigParam } from "./airtableMongoMigration";

const insertToMongo = async (doc, coll) => {
    const { MongoClient } = require("mongodb");
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

    // fetching assignents from airtable 

AtBase('Assignments').select({
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                if (record.get('Name')  ) {  {} // in case if there is an empty row in the airtable
                    let assignments = {
                        assignment_title:record.get('Name'),
                        link:record.get('Link'),
                        assignment_airtableID:record.id
                    }
                     insertToMongo(assignments, 'assignments')
                }
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });