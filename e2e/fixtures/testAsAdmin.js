import { test as base } from "./withMongo";

export * from "@playwright/test";
export const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: process.env.STORAGE_STATE_ADMIN,
    });
    await use(context);
    await context.close();
  },
});
