import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("example of testing API", () => {
  test("should get the list of users", async ({ request, db }) => {
    const response = await request.get(`/api/users`);
    expect(response).toBeOK();

    const users = (await response.json()).data;
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  });
});
