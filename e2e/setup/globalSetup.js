import { loadEnvConfig } from "@next/env";
import { MongoMemoryServer } from "mongodb-memory-server";
import { chromium } from "@playwright/test";
import { MongoClient } from "mongodb";
import path from "node:path";
import { promises as fs } from "fs";
import crypto from "crypto";

async function globalSetup() {
  process.env.NODE_ENV = "test";
  //load env file
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  //create a in-memory mongo db
  const dbName = process.env.MONGODB_DB;
  const port = process.env.MONGODB_PORT;

  const mongod = await MongoMemoryServer.create({
    instance: { dbName: dbName, port: parseInt(port) },
  });
  const uri = mongod.getUri();

  if (process.env.MONGODB_URI.startsWith(uri)) {
    console.log("Successfuly set up a mongo db at " + process.env.MONGODB_URI);
  } else {
    throw Error("Could not create DB at " + process.env.MONGODB_URI);
  }

  //populate db with one admin
  await prepareUser("user");
  await prepareUser("admin", true);
}

const prepareUser = async (name, isAdmin = false) => {
  //get an expiry time to set the session to
  const now = new Date();
  const expiry = new Date(now.getFullYear(), now.getMonth() + 1, 0); //in a month

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const sessionToken = crypto.randomUUID();
  const ghId = crypto.randomInt(999999);

  //users
  const user = {
    gh_id: ghId,
    name: `${name} Test`,
    email: `${name}@codethedream.org`,
    gh: name,
    url: `https://github.com/${name}`,
    emailVerified: true,
    is_admin: isAdmin,
  };

  const res = await client
    .db(process.env.MONGODB_DB)
    .collection("users")
    .insertOne(user);

  user.id = res.insertedId;
  console.log("created user with id " + user.id);

  //session
  await client.db(process.env.MONGODB_DB).collection("sessions").insertOne({
    sessionToken: sessionToken,
    userId: user.id,
    expires: expiry,
  });

  //account
  await client
    .db(process.env.MONGODB_DB)
    .collection("accounts")
    .insertOne({
      provider: "github",
      type: "oauth",
      providerAccountId: "" + ghId,
      access_token: crypto.randomUUID(),
      token_type: "bearer",
      scope: "read:user,user:email",
      userId: user.id,
    });

  //this is the file we'll be saving the cookie in
  const storagePath = path.resolve(__dirname, `../.storage/${name}.json`);
  // make sure the file exists, if not create it with an empty object
  fs.readFile(storagePath).catch(() => fs.writeFile(storagePath, "{}"));

  // launch a browser and get a new context
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: storagePath });

  //add a cookie that looks like what next-auth would have put there
  //make sure it's the same value that was set in the db
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
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

  const envKey = "STORAGE_STATE_" + name.toUpperCase();
  process.env[envKey] = `e2e/.storage/${name}.json`;
  console.log(
    `stored session for user "${name}" in STORAGE_STAGE_` + name.toUpperCase()
  );

  return { user };
};

export default globalSetup;
