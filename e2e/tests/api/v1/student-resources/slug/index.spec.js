import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/student-resources/[slug]", () => {
  //GET SLUG TESTS
  test("gets a student resource page using slug as argument", async ({
    request,
    db,
  }) => {
    //gets a document with slug value that is not null
    const studentresource = await db.collection("staticpages").findOne({
      slug: { $ne: null },
    });
    const slug = studentresource.slug;

    //hit endpoint with slug as path parameter
    const response = await request.get(`/api/v1/student-resources/${slug}`);
    const studentresourceslug = (await response.json()).data;
    expect(response.ok()).toBeTruthy();
    expect(studentresourceslug).toMatchObject(studentresource);
  });

  test("test GET request of a student resource with invalid slug", async ({
    request,
  }) => {
    //invalid slug
    const slug = "does-not-exist";
    //get request with invalid slug as parameter
    const response = await request.get(`/api/v1/student-resources/${slug}`);
    //check 404 status assertion
    expect(response.status()).toBe(404);
    const invalidpageslug = (await response.json()).data;
    expect(invalidpageslug).toBeUndefined();
  });

  test("test GET request of a student resource with isShown boolean set false", async ({
    request,
    db,
  }) => {
    //make get request with isShown false
    const studentresource = await db.collection("staticpages").findOne({
      isShown: { $eq: false },
    });
    const slug = studentresource.slug;

    //hit endpoint with slug as path parameter
    const response = await request.get(`/api/v1/student-resources/${slug}`);

    //check status assertion
    expect(response.status()).toBe(404);
    const studentresourceresponse = (await response.json()).data;
    //assertion for undefined or null
    expect(studentresourceresponse).toBeUndefined();
  });
});
