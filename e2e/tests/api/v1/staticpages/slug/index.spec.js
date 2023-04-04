import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/staticpages/[slug]", () => {
  //GET SLUG TESTS
  test("gets a static page using slug as argument", async ({ request, db }) => {
    //gets a document with slug value that is not null
    const staticpageslug = await db.collection("staticpages").findOne({
      slug: { $ne: null },
    });

    //hit endpoint with slug as path parameter
    const response = await request.get(
      `/api/v1/staticpages/${staticpageslug.slug}`
    );

    const data = (await response.json()).data;

    expect(response.ok()).toBeTruthy();
  });
});
