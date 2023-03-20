import { test, expect } from "e2e/fixtures/withMongo";
import crypto from "crypto";
import { ObjectID } from "bson";

test.describe("withMongo Fixture", () => {
  test("provides access to the test mongo db", async ({ db }) => {
    expect(db.databaseName).toEqual(process.env.MONGODB_DB);
  });

  test("resetData removes all users except the ones created automatically", async ({
    db,
  }) => {
    //meta, I know
    await db.resetData();

    let users;
    const usersToAdd = [
      {
        name: "manually added",
        email: "manual@codethedream.org",
        gh: "manual",
      },
      {
        name: "manually added admin",
        email: "manualAdmin@test.com",
        gh: "manualAdmin",
        is_admin: true,
      },
    ];
    const originalCount = 2;
    //check there are only 2 users
    users = await db.collection("users").find().toArray();
    expect(users).toHaveLength(originalCount);

    //add a few more users
    await db.collection("users").insertMany(usersToAdd);

    //make sure users were added
    users = await db.collection("users").find().toArray();
    expect(users).toHaveLength(originalCount + usersToAdd.length);

    //call reset
    await db.resetData();

    //check that we are back to 2 users again
    users = await db.collection("users").find().toArray();
    expect(users).toHaveLength(originalCount);
  });

  test("resetData removes all Accounts except the ones created automatically", async ({
    db,
  }) => {
    let accounts;
    const originalCount = 2;

    //check there are only 2 accounts
    accounts = await db.collection("accounts").find().toArray();
    expect(accounts).toHaveLength(originalCount);

    const makeRandomAccount = () => {
      return {
        provider: "github",
        type: "oauth",
        providerAccountId: "" + crypto.randomInt(99999),
        access_token: crypto.randomUUID(),
        token_type: "bearer",
        scope: "read:user,user:email",
        userId: new ObjectID(),
      };
    };

    const accountsToAdd = [
      makeRandomAccount(),
      makeRandomAccount(),
      makeRandomAccount(),
    ];

    //add a few more accounts
    await db.collection("accounts").insertMany(accountsToAdd);

    //make sure accounts were added
    accounts = await db.collection("accounts").find().toArray();
    expect(accounts).toHaveLength(originalCount + accountsToAdd.length);

    //call reset
    await db.resetData();

    //check that we are back to 2 accounts again
    accounts = await db.collection("accounts").find().toArray();
    expect(accounts).toHaveLength(originalCount);
  });

  test("resetData removes all sessions except the ones created automatically", async ({
    db,
  }) => {
    let sessions;
    const originalCount = 2;

    //check there are only 2 sessions
    sessions = await db.collection("sessions").find().toArray();
    expect(sessions).toHaveLength(originalCount);

    const makeRandomSession = () => {
      return {
        sessionToken: crypto.randomUUID(),
        userId: new ObjectID(),
        expires: crypto.randomInt(99999999999),
      };
    };

    const sessionsToAdd = [
      makeRandomSession(),
      makeRandomSession(),
      makeRandomSession(),
    ];

    //add a few more sessions
    await db.collection("sessions").insertMany(sessionsToAdd);

    //make sure sessions were added
    sessions = await db.collection("sessions").find().toArray();
    expect(sessions).toHaveLength(originalCount + sessionsToAdd.length);

    //call reset
    await db.resetData();

    //check that we are back to 2 sessions again
    sessions = await db.collection("sessions").find().toArray();
    expect(sessions).toHaveLength(originalCount);
  });

  test("resetData drops all other collections", async ({ db }) => {
    await db.resetData();
    let collections;
    const getCollections = async () => {
      const allCollections = await db.listCollections().toArray();
      return await Promise.all(allCollections.map((c) => c.name));
    };


    //check we have only 3 collections to start with, and that they are the ones we expect
    const expectedCollections = ["users", "accounts", "sessions"];
    collections = await getCollections();
    expect(collections).toHaveLength(expectedCollections.length);
    expect(collections.sort()).toEqual(expectedCollections.sort());

    //add a bunch of collections
    const collectionsToAdd = ["coll1", "coll2", "coll3", "coll4"];

    await Promise.all(
      collectionsToAdd.map(
        async (c) => await db.collection(c).insertOne({ test: true })
      )
    );

    //make sure they were added
    collections = await getCollections();
    expect(collections).toHaveLength(
      expectedCollections.length + collectionsToAdd.length
    );
    expect(collections.sort()).toEqual(
      [...expectedCollections, ...collectionsToAdd].sort()
    );

    //call data reset
    await db.resetData();

    //make sure we are back to original collections
    collections = await getCollections();
    expect(collections).toHaveLength(expectedCollections.length);
    expect(collections.sort()).toEqual(expectedCollections.sort());
  });
});
