/*
This script removes all fields holding Airtable Ids from all collections
*/

const { mongoConnection, getConfigParam } = require("../utils.js");

let db;
let dbName;

const fieldsToRemove = [
  { collection: "assignments", fields: ["assignment_airtableID"] },
  { collection: "cohorts", fields: ["course_airtableID"] },
  { collection: "courses", fields: ["airtable_id", "lesson_airtable_ids"] },
  {
    collection: "lessons",
    fields: [
      "airtable_id",
      "course_airtableID",
      "materials_airtableID",
      "assignment_airtableID",
    ],
  },
  { collection: "materials", fields: ["materials_airtableID"] },
];

async function deleteAllFields() {
  const client = await mongoConnection();
  db = client.db(dbName);

  for (item of fieldsToRemove) {
    const { collection, fields } = item;
    const unset = Object.fromEntries(fields.map((i) => [i, 1]));
    const res = await db
      .collection(collection)
      .updateMany({}, { $unset: unset });
    console.log(res);
  }

  await client.close();
}

async function run() {
  dbName = await getConfigParam("MONGODB_DB");

  process.stdin.on("data", async function (data) {
    if (data.toString().trim() === "yes") await deleteAllFields();

    process.stdin.end();
    process.exit(0);
  });

  process.stdout.write(
    `Running this script will remove all fields from database "${dbName}". Please type "yes" if you wish to continue\n>`
  );
}

run();

