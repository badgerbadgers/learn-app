import { loadEnvConfig } from "@next/env";
import { MongoMemoryServer } from "mongodb-memory-server";
import { chromium } from "@playwright/test";
import { MongoClient } from "mongodb";
import path from "node:path";

async function globalSetup() {
  process.env.NODE_ENV = "test";
  //load env file
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  //create a in-memory mongo db and override
  //process envs to load it
  const dbName = process.env.MONGODB_DB;
  const port = process.env.MONGODB_PORT;
  console.log(`SETTING UP DB ${dbName} ON PORT ${port}`);

  const mongod = await MongoMemoryServer.create({
    instance: { dbName: dbName, port: parseInt(port) },
  });
  const uri = mongod.getUri();
  console.log("SETUP MONGODB FOR TESTING AT URI: " + uri);

  process.env.TEST_SESSION_TOKEN = "04456e41-ec3b-4edf-92c1-48c14e57cacd2";

  //get an expiry time to set the session to
  const now = new Date();
  const expiry = new Date(now.getFullYear(), now.getMonth() + 1, 0); //in a month

  //populate db with one admin
  (async () => {
    const client = new MongoClient(uri);
    await client.connect();

    //users
    const admin_user = {
      gh_id: 12345,
      name: "Test McTester",
      email: "tester@codethedream.org",
      gh: "tester",
      url: "https://github.com/tester",
      emailVerified: true,
      is_admin: true,
    };

    const res = await client
      .db(dbName)
      .collection("users")
      .insertOne(admin_user);

    admin_user.id = res.insertedId;
    console.log("created admin user with id " + admin_user.id);

    //session
    await client.db(dbName).collection("sessions").insertOne({
      sessionToken: process.env.TEST_SESSION_TOKEN,
      userId: admin_user.id,
      expires: expiry,
    });

    //account
    await client.db(dbName).collection("accounts").insertOne({
      provider: "github",
      type: "oauth",
      providerAccountId: "12345",
      access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
      token_type: "bearer",
      scope: "read:user,user:email",
      userId: admin_user.id,
    });
  })();

  // launch a browser and get a new context
  const storagePath = path.resolve(__dirname, "storageState.json");
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: storagePath });

  //add a cookie that looks like what next-auth would have put there
  //make sure it's the same value that was set in the db
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: process.env.TEST_SESSION_TOKEN,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires: Date.parse(expiry) / 1000,
    },
  ]);

  //store the new cooke in the file, for loading later
  await context.storageState({ path: storagePath });
  await browser.close();
}

export default globalSetup;
