import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/users/[id]/acceptanceforms", () => {
  //GET TESTS

  test(
    "returns all acceptanceforms for user by session",
    async ({ request, db }) => {
      //create acceptanceform for session user
      const userId = "62b22b42f4da59dbea98071b";
        

      //call GET and get all acceptance form for sessin's user
      const response = await request.get(`/api/v1/users/${userId}/acceptanceforms`);
      expect(response.ok()).toBeTruthy();

      const acceptanceforms = (await response.json()).data;

    }
  );

  test.fixme("get returns 404 if acceptanceforms not found", async ({ request, db }) => {
    //call GET and get all acceptanceforms by user Id
    const userId = "62b22b42f4da59dbea98071b";
    //delete created before acceptance form
    await db
      .collection("acceptanceforms")
      .deleteOne({ user: ObjectId(userId) });
    const response = await request.get(
      `/api/v1/users/${userId}/acceptanceforms`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

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
