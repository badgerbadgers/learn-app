import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/staticpages", () => {
  //GET TESTS
  test("returns an array when there are staticpages", async ({ request }) => {
    //GET request all static pages
    const res = await request.get(`/api/v1/staticpages`);
    expect(res.status()).toBe(200);

    expect(res.ok()).toBeTruthy();

    //GET all static pages
    const staticpages = (await res.json()).data;

    //check for object containing isShown = true exists
    expect(staticpages).toContainEqual(
      expect.objectContaining({ isShown: true })
    );
    // check for object containing isShown = false exists
    expect(staticpages).toContainEqual(
      expect.objectContaining({ isShown: false })
    );
  });

  //POST TESTS
  test("returns an array with new static page", async ({ request, db }) => {
    //new obj to test with using fakerjs
    const fakerJsStaticPage = {
      wordpress_id: faker.datatype.number(1000),
      title: faker.lorem.text(),
      isShown: faker.datatype.boolean(),
      slug: faker.lorem.slug(),
    };

    //then make POST with faker data
    const responsewithfakerdata = await request.post(`/api/v1/staticpages`, {
      data: fakerJsStaticPage,
    });
    expect(responsewithfakerdata.ok()).toBeTruthy();
    const resFakerData = (await responsewithfakerdata.json()).data;
    expect(resFakerData).toMatchObject(fakerJsStaticPage);

    //wordpress id not null
    expect(resFakerData.wordpress_id).toBeDefined();
  });

  test("does not create static page if wordpress_id is missing", async ({
    request,
  }) => {
    //new obj to test with using fakerjs
    const fakerJsStaticPageNoWPid = {
      title: faker.lorem.text(),
      isShown: faker.datatype.boolean(),
      slug: faker.lorem.slug(),
    };

    const responsewithfaker = await request.post(`/api/v1/staticpages`, {
      data: fakerJsStaticPageNoWPid,
    });

    //status should be 400
    expect(responsewithfaker.status()).toBe(400);

    const staticpages = (await responsewithfaker.json()).data;

    expect(staticpages).toBeUndefined();
  });

  test("returns error when creating empty static page object", async ({
    request,
  }) => {
    const emptyStaticPage = {};

    const reswithemptystaticpage = await request.post(`/api/v1/staticpages`, {
      data: emptyStaticPage,
    });

    //missing wordpress_id field status should be 400
    expect(reswithemptystaticpage.status()).toBe(400);
  });
});
