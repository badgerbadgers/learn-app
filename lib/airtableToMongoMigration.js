// TODO: 
//pagination or max records check
// validation content in AT fields 
//replace name of fields with IDs 

const testTry = (apiKey) => {
    const Airtable = require("airtable");
    const AtBase = new Airtable({ apiKey: apiKey }).base('appXnj8G9efiiY9Ge');


    // base('Calendar').select({
    //     maxRecords: 3,
    //     view: "Grid view"
    // }).eachPage(function page(records, fetchNextPage) {
    //     // This function (`page`) will get called for each page of records.
    
    //     records.forEach(function(record) {
    //         console.log('Retrieved', record.get('Name'), record.get('Start Date'), record.get('End Date'));
    //     });
    
    //     // To fetch the next page of records, call `fetchNextPage`.
    //     // If there are more records, `page` will get called again.
    //     // If there are no more records, `done` will get called.
    //     fetchNextPage();
    
    // }, function done(err) {
    //     if (err) { console.error(err); return; }
    // });


    let coursesToDb = [];
    let classesInfo = {};
    AtBase('Classes').select({
        // view: "Default View",

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            // console.log('Retrieved Classes', record.id);
            classesInfo[record.id] = record.fields;
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    }); 



    AtBase('Courses').select({
        view: "Default View",

    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

    
        records.forEach(function(record) {
            let course = {
                course_name: record.get('Name'),
                airtable_id: record.id, 
            }
            coursesToDb.push(course);
            console.log('Retrieved', course);
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    


} 
export default testTry

