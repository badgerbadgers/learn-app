import { test, expect } from "e2e/fixtures/testAsGuest";

test ("get returns 401 if user not authorized", async ({ request }) => {
  //call GET and get all the non-deleted users
  const response = await request.get(`/api/v1/users/acceptanceforms`);
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(401);

});
