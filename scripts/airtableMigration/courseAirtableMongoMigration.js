const { airtableConnection } = require("../utils.js");
const upload = require("./insertToMongo");

// This script is fetching courses and lessons from Airtable and inserting to mongo collection

const getLessons = async () => {
    const AtBase = await airtableConnection();
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
    const AtBase = await airtableConnection();
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
                dataToMongo.push(course);
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
    upload(toMongo, "courses"); // change the name of collection manually 
}

main();
