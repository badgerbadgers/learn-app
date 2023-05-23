import { test, expect } from "e2e/fixtures/testAsGuest";

test.describe("/api/v1/acceptanceforms", () => {
  //GET TEST

  test("get returns 401 if user not authorized", async ({ request }) => {
    //call GET and get all the acceptance forms
    const response = await request.get("/api/v1/acceptanceforms");
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
  });
});
