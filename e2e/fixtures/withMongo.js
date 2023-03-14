import { test as base, Page, Browser } from "@playwright/test";
import { MongoClient, MongoNotConnectedError } from "mongodb";

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
      this.collection(c).drop();
    }
  }
};

export * from "@playwright/test";
export const test = base.extend({
  db: async ({}, use) => {
    const mongo = new MongoClient(process.env.MONGODB_URI);
    await mongo.connect();
    const db = mongo.db(process.env.MONGODB_DB);
    db.resetData = resetData;
    await use(db);
    //TODO: should we reset data between every test?
    //It makes sense on the surface, but can get dicey with running multiple tests in parallel.
    // await db.resetData();
  },
});
