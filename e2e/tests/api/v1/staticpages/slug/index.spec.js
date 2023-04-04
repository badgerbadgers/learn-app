import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/staticpages/[slug]", () => {
  //GET SLUG TESTS
  test("gets a static page using slug", async ({ request, db }) => {
    const testslug = "bass-practicum";
    const staticpageslug = await db.collection("staticpages").findOne({
      slug: testslug,
    });

    const response = await request.get(
      `/api/v1/staticpages/${staticpageslug.slug}`
    );

    const data = (await response.json()).data;

    expect(response.ok()).toBeTruthy();
  });
});
