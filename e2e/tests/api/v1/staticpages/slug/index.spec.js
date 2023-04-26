import { test, expect } from "e2e/fixtures/testAsGuest";

test.describe("/api/v1/staticpages/[slug]", () => {
  //GET SLUG TESTS
  test("gets a static page using slug as argument", async ({ request, db }) => {
    //gets a document with slug value that is not null
    const staticpage = await db.collection("staticpages").findOne({
      slug: { $ne: null },
    });
    const slug = staticpage.slug;

    //hit endpoint with slug as path parameter
    const response = await request.get(`/api/v1/staticpages/${slug}`);

    const staticpageslug = (await response.json()).data;
    expect(response.ok()).toBeTruthy();
    expect(staticpageslug).toMatch(slug);
    expect(typeof staticpageslug).toBe("string");
  });

  test("test GET request of a static page with invalid slug", async ({
    request,
  }) => {
    //invalid slug
    const slug = "does-not-exist";
    //get request with invalid slug as parameter
    const response = await request.get(`/api/v1/staticpages/${slug}`);
    //check 404 status assertion
    expect(response.status()).toBe(404);
    const invalidpageslug = (await response.json()).data;
    expect(invalidpageslug).toBeUndefined();
  });

  test("test GET request of a static page with isShown boolean set false", async ({
    request,
    db,
  }) => {
    //make get request with isShown false
    const staticpage = await db.collection("staticpages").findOne({
      isShown: { $eq: false },
    });
    const slug = staticpage.slug;

    //hit endpoint with slug as path parameter
    const response = await request.get(`/api/v1/staticpages/${slug}`);

    //check 404 status assertion
    expect(response.status()).toBe(404);
    const staticpageresponse = (await response.json()).data;
    //assertion for undefined or null
    expect(staticpageresponse).toBeUndefined();
  });
});
