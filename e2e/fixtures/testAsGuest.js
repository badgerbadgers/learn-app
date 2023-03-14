import { test as base, Page, Browser } from "@playwright/test";

export * from "@playwright/test";
export const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
});
