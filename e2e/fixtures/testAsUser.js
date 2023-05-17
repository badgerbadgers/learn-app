import { test as base } from "./withMongo";

export * from "@playwright/test";
export const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: process.env.STORAGE_STATE_USER,
    });
    await use(context);
    await context.close();
  },
  request: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: process.env.NEXTAUTH_URL,
      storageState: process.env.STORAGE_STATE_USER,
    });
    await use(request);
    await request.dispose();
  },
  user: async ({ db }, use) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });
    await use(user);
  },
});
