import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/lessons", () => {
  //GET TESTS

  test("returns all lessons", async ({ request }) => {
    //call GET and get all the  lessons
    const response = await request.get(`/api/v1/lessons`);
    expect(response.ok()).toBeTruthy();
  });
});
