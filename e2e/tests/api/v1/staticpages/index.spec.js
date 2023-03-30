import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/staticpages", () => {
  //tests for GET req
  // [x] There is data to return
  //dont implement error tests for now JEST will run these tests and Playwright cannot
  //tests for POST req
  // [x] creates new static page with isShown, wordpress_id, slug and title

  //GET TESTS
  test("returns an array when there are staticpages", async ({ request }) => {
    //GET request all static pages
    const res = await request.get(`/api/v1/staticpages`);
    expect(res.ok()).toBeTruthy();

    //GET all static pages
    const staticpages = (await res.json()).data;

    //check for object containing isShown = true exists
    expect(staticpages).toContainEqual(
      expect.objectContaining({ isShown: true })
    );
    //check for object containing isShown = false exists
    expect(staticpages).toContainEqual(
      expect.objectContaining({ isShown: false })
    );
  });

  //POST TESTS
  test("returns an array with newly created object", async ({ request }) => {
    //new obj to test with
    const newStaticPage = {
      wordpress_id: faker.datatype.number(1000),
      title: faker.lorem.text(),
      isShown: faker.datatype.boolean(),
      slug: faker.lorem.slug(),
    };
    //check isShown bool cannot be null
    expect(newStaticPage.isShown).not.toBeNull();
    //check wordpress_id cannot be null
    expect(newStaticPage.wordpress_id).not.toBeNull();

    //then make POST
    const response = await request.post(`/api/v1/staticpages`, {
      data: newStaticPage,
    });
    expect(response.ok()).toBeTruthy();

    //newly created object contains the following properties
    expect(newStaticPage).toEqual(
      expect.objectContaining({
        wordpress_id: newStaticPage.wordpress_id,
        isShown: newStaticPage.isShown,
        slug: newStaticPage.slug,
        title: newStaticPage.title,
      })
    );
  });

  //FAIL TESTS WONT POST IF MISSING FIELDS
  test("does not create static page if isShown is missing", async ({
    request,
  }) => {
    const newstaticpage = {
      wordpress_id: faker.datatype.number(1000),
      title: faker.lorem.text(),
      slug: faker.lorem.slug(),
    };
    const res = await request.post(`/api/v1/staticpages`, {
      data: newstaticpage,
    });

    const getRes = await request.get(`/api/v1/staticpages`);
    expect(getRes.ok()).toBeTruthy();

    const staticpages = (await getRes.json()).data;
    expect(staticpages).not.toContainEqual(
      expect.objectContaining({
        isShown: newstaticpage.isShown,
      })
    );
  });

  //
  test("does not create static page if wordpress_id is missing", async ({
    request,
  }) => {
    const newstaticpage = {
      isShown: faker.datatype.boolean(),
      title: faker.lorem.text(),
      slug: faker.lorem.slug(),
    };
    const res = await request.post(`/api/v1/staticpages`, {
      data: newstaticpage,
    });

    const getRes = await request.get(`/api/v1/staticpages`);
    expect(getRes.ok()).toBeTruthy();

    const staticpages = (await getRes.json()).data;
    expect(staticpages).not.toContainEqual(
      expect.objectContaining({
        wordpress_id: newstaticpage.wordpress_id,
      })
    );
  });
});
