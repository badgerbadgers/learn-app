import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/users/[id]/acceptanceforms", () => {
  //GET TESTS

  test("returns all acceptanceforms", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const response = await request.get(
      `/api/v1/users/${userId}/acceptanceforms`
    );
    expect(response.ok()).toBeTruthy();
    const acceptanceforms = (await response.json()).data;
    expect(acceptanceforms.length).toBeGreaterThan(0);
  });

  test.fixme("returns more than one acceptanceforms", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const response = await request.get(
      `/api/v1/users/${userId}/acceptanceforms`
    );
    expect(response.ok()).toBeTruthy();
    const acceptanceforms = (await response.json()).data;
    expect(acceptanceforms.length).toBeGreaterThan(1);
  });

  test.fixme(
    "get returns 400 if acceptanceforms not found",
    async ({ request }) => {
      const userId = "62b22b42f4da59dbea98071b";

      const response = await request.get(
        `/api/v1/users/${userId}/acceptanceforms`
      );
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    }
  );

  test(
    "get returns 400 if userId not found",
    async ({ request, db }) => {
      //call GET and get all acceptanceforms by user Id
      const userId = faker.random.numeric(8);

      const response = await request.get(
        `/api/v1/users/${userId}/acceptanceforms`
      );
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    }
  );
});
