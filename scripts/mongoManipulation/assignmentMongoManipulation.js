const utils = require("./utils.js");
const { MongoClient } = require("mongodb"); 

//this script is to clean up the assignment collection in mongo 

const minifyAssignments = async()=> {
    const uri = await utils.getConfigParam(/^MONGODB_URI=(.+)/);
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("myFirstDatabase");
    const Airtable = require("airtable");
    const param = await utils.getConfigParam(/AT_KEY=(.+)/); 

    try{  
        const assignmentsArray = await db
        .collection("assignments").aggregate([
            
        ])

    }catch (e){ 
        console.log("ERROR", e.message )
    }
} 

minifyAssignments()