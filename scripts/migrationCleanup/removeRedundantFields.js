/*
This script removes redundant fields left by the airtable migration and mongo manipulation scripts
*/

const readline = require("readline");
const { mongoConnection, getConfigParam } = require("../utils.js");

let db;
let dbName;
let client;

const fieldsToRemove = [
  {
    collection: "lessons",
    fields: ["lesson_label", "section_title"],
  },
];

async function deleteField(collection, field) {
  console.log(`removing field ${field} from collection ${collection}`);
  const unset = Object.fromEntries([field].map((i) => [i, 1]));
  const res = await db.collection(collection).updateMany({}, { $unset: unset });
  console.log(res);
}

async function validateDelete(collection, field) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const confirmMessage = `\nType "${field}" to confirm removing field "${field}" from collection "${collection}>" `;

  return new Promise((resolve) =>
    rl.question(confirmMessage, (ans) => {
      rl.close();
      resolve(ans === field);
    })
  );
}

async function run() {
  dbName = await getConfigParam("MONGODB_DB");
  console.log(`running on database ${dbName}`);
  client = await mongoConnection();
  db = client.db(dbName);

  for (const { collection, fields } of fieldsToRemove) {
    for (const field of fields) {
      if (await validateDelete(collection, field)) {
        console.log(`removing field "${field}" from collection ${collection}`);
        await deleteField(collection, field);
      } else {
        console.log(`skipping field "${field}" from collection ${collection}`);
      }
    }
  }

  await client.close();
  process.exit(0);
}

run();

