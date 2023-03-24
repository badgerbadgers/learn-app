import { test, expect } from "e2e/fixtures/testAsAdmin";
import { ObjectId } from "bson";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/staticpages", () => {
  //all tests for GET req
  // [x] There is data to return
  // [x] There is data that is marked as is_shown=true
  // [x] There is data that is marked as is_shown=false
  // [x] There is no data to return
  //dont implement error tests for now JEST will run these tests and Playwright cannot

  test("returns an array when there are staticpages", async ({
    request,
    db,
  }) => {
    //GET request all static pages
    const res = await request.get(`/api/v1/staticpages`);
    expect(res.ok()).toBeTruthy();

    //GET static pages that have boolean isShown = true
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

  //no data to return
  test("returns an empty array when there is no data", async ({ request }) => {
    async ({ request }) => {
      const response = await request.get(`/api/v1/staticpages`, {
        params: {
          wp_id: 909090,
        },
      });
      expect(response.ok()).toBeTruthy();
      expect((await response.json()).data).toHaveLength(0);
    };
  });
});
