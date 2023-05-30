import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";


test.describe("/api/v1/users/[id]/acceptanceforms", () => {
  //GET TESTS

  test("returns all acceptanceforms", async ({ request, db }) => {
  // group acceptanceforms by user , count and find more then 0
  const usersArray = await db
    .collection("acceptanceforms")
    .aggregate([
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 0 },
        },
      },
      {
        $project: {
          user: "$_id",
        },
      },
    ])
    .toArray();
    
    //take userID from first object
    const userId = await usersArray[0].user.toString();
    const response = await request.get(
      `/api/v1/users/${userId}/acceptanceforms`
    );
    expect(response.ok()).toBeTruthy();
    const acceptanceforms = (await response.json()).data;
    expect(acceptanceforms.length).toBeGreaterThan(0);
  });

  test("returns more than one acceptanceforms", async ({ request, db }) => {
    // group acceptanceforms by user , count and find more then 1
    const usersArray = await db
      .collection("acceptanceforms")
      .aggregate([
        {
          $group: {
            _id: "$user",
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
        {
          $project: {
            user: "$_id",
          },
        },
      ])
      .toArray();
    //take userID from first object
    const userId = await usersArray[0].user.toString();
    const response = await request.get(
      `/api/v1/users/${userId}/acceptanceforms`
    );
    expect(response.ok()).toBeTruthy();
    const acceptanceforms = (await response.json()).data;
    expect(acceptanceforms.length).toBeGreaterThan(1);
  });

  test.only(
    "get returns empty array if acceptanceforms not found",
    async ({ request, db }) => {
      // group acceptanceforms by user , count and find  1 acceptanceform
      const usersArray = await db
        .collection("acceptanceforms")
        .aggregate([
          {
            $group: {
              _id: "$user",
              count: { $sum: 1 },
            },
          },
          {
            $match: {
              count: { $eq: 1 },
            },
          },
          {
            $project: {
              user: "$_id",
            },
          },
        ])
        .toArray();
      //take userID from first object
      const userId = await usersArray[0].user.toString();

      //update acceptanceform
      const updatedUserId = faker.random.numeric(8);
      await db
        .collection("acceptanceforms")
        .findOneAndUpdate(
          { user: ObjectId(userId) },
          { $set: { user: updatedUserId } },
          { new: true }
        );

      const response = await request.get(
        `/api/v1/users/${userId}/acceptanceforms`
      );
      expect(response.ok()).toBeTruthy();
      const acceptanceforms = (await response.json()).data;
      expect(acceptanceforms.length).toBe(0);

      //update acceptanceform back
      await db
        .collection("acceptanceforms")
        .findOneAndUpdate(
          { user: updatedUserId },
          { $set: { user: ObjectId(userId) } },
          { new: true }
        );

      const responseBack = await request.get(
        `/api/v1/users/${userId}/acceptanceforms`
      );
      expect(responseBack.ok()).toBeTruthy();
      const acceptanceformsBack = (await responseBack.json()).data;
      expect(acceptanceformsBack.length).toBe(1);
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
