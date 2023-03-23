import { test as base, Page, Browser } from "@playwright/test";
import { MongoClient, MongoNotConnectedError } from "mongodb";
import path from "node:path";
import { Seeder } from "mongo-seeding";

const resetData = async function () {
  //grab userids for automatically created users
  const usersToKeep = await this.collection("users").distinct("_id", {
    email: { $in: ["admin@codethedream.org", "user@codethedream.org"] },
  });

  //reset users to only have auto created users
  await this.collection("users").deleteMany({ _id: { $nin: usersToKeep } });

  //reset sessions and accounts to only have data for auto created users
  await this.collection("sessions").deleteMany({
    userId: { $nin: usersToKeep },
  });
  await this.collection("accounts").deleteMany({
    userId: { $nin: usersToKeep },
  });

  //reset all other collections
  const collsToSkip = ["users", "accounts", "sessions"];
  const collections = (await this.listCollections().toArray()).map(
    (c) => c.name
  );
  //for each collection
  for (const c of collections) {
    //if the collection name is not users, accounts or sessions
    if (collsToSkip.indexOf(c) === -1) {
      //drop it
      await this.collection(c).drop();
    }
  }
};

const loadData = async function (pathToData = "e2e/setup/data") {
  const collections = await this.seeder.readCollectionsFromPath(
    path.resolve(pathToData)
    // collectionReadingOptions,
  );
  try {
    await this.seeder.import(collections);
  } catch (err) {
    console.error(err);
  }
};

const getCollections = async function () {
  const allCollections = await this.listCollections().toArray();
  return await Promise.all(allCollections.map((c) => c.name));
};

export * from "@playwright/test";
export const test = base.extend({
  db: async ({}, use) => {
    //prepare a mongo client using the test db
    const mongo = new MongoClient(process.env.MONGODB_URI);
    await mongo.connect();
    const db = mongo.db(process.env.MONGODB_DB);

    db.getCollections = getCollections;
    //add custom method for returning data to minimal
    db.resetData = resetData;

    //prepare seeder for easily loading data into mongo
    //(see https://github.com/pkosiec/mongo-seeding)
    const seederConfig = {
      database: process.env.MONGODB_URI,
      dropDatabase: false, //we don't want to drop the db, as we want to keep our basic user data
    };
    db.seeder = new Seeder(seederConfig);
    db.loadData = loadData;

    await use(db);
  },
});
