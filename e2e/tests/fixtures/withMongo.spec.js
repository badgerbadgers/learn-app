import { test, expect } from "e2e/fixtures/withMongo";
import crypto from "crypto";
import { ObjectId } from "mongodb";

test.describe("withMongo Fixture", () => {
  test("provides access to the test mongo db", async ({ db }) => {
    expect(db.databaseName).toEqual(process.env.MONGODB_DB);
  });

  test("loadData is working", async ({ db }) => {
    const courses = await db.collection("courses").find().toArray();
    expect(courses.length).not.toEqual(0);

    const users = await db.collection("users").find().toArray();
    // console.log(users);
    expect(users.length).not.toEqual(2);
  });

  test("resetData removes all users except the ones created automatically", async ({
    db,
  }) => {
    //call reset
    await db.resetData();

    //check that we are back to 2 users again
    const users = await db.collection("users").find().toArray();
    expect(users).toHaveLength(2);

    await db.loadData();
  });

  test("resetData removes all Accounts except the ones created automatically", async ({
    db,
  }) => {
    //call reset
    await db.resetData();

    //check that we are back to 2 accounts again
    const accounts = await db.collection("accounts").find().toArray();
    expect(accounts).toHaveLength(2);

    await db.loadData();
  });

  test("resetData drops all other collections", async ({ db }) => {
    //check we have only 3 collections to start with, and that they are the ones we expect
    const expectedCollections = ["users", "accounts", "sessions"];

    //call data reset
    await db.resetData();

    //make sure we are back to original collections
    const collections = await db.getCollections();
    expect(collections).toHaveLength(expectedCollections.length);
    expect(collections.sort()).toEqual(expectedCollections.sort());

    await db.loadData();
  });
});
