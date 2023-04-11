import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/staticpages", () => {
  //tests for GET req
  // [x] There is data to return
  //dont implement error tests for now JEST will run these tests and Playwright cannot
  //tests for POST req
  // [x] creates new static page with isShown, wordpress_id, slug and title

  //GET TESTS
  test.only("returns an array when there are staticpages", async ({
    request,
  }) => {
    //GET request all static pages with isShown = true
    const res = await request.get(`/api/v1/student-resources`);
    expect(res.ok()).toBeTruthy();

    const staticpages = (await res.json()).data;
    console.log("statics", staticpages);
    //check for object containing isShown = true exists
    expect(staticpages).toContainEqual(
      expect.objectContaining({ isShown: true })
    );
    //check for object containing isShown = false exists
    expect(staticpages).not.toContainEqual(
      expect.objectContaining({ isShown: false })
    );
  });
});
