import { test, expect } from "e2e/fixtures/testAsUser";
import { ObjectId } from "mongodb";

test.describe("/api/v1/users/acceptanceforms", () => {
  //GET TESTS

  test("returns acceptanceforms for user by session", async ({
    request,
    user,
    db,
  }) => {
    //get first acceptanceform
    const acceptanceform = await db.collection("acceptanceforms").findOne();
    const userId = acceptanceform.user;

    //update acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(userId) },
        { $set: { user: ObjectId(user._id) } },
        { new: true }
      );

    //call GET and get acceptance form
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    //update acceptanceform back
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(user._id) },
        { $set: { user: ObjectId(userId) } },
        { new: true }
      );
  });

  test("returns last acceptanceform for user by session and not returns first acceptanceform", async ({
    request,
    user,
    db,
  }) => {
    //get two acceptanceforms
    const acceptanceforms = await db
      .collection("acceptanceforms")
      .find()
      .limit(2)
      .toArray();
    const firstUser = acceptanceforms[0].user;
    const lastUser = acceptanceforms[1].user;

    //update first acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(firstUser) },
        { $set: { user: ObjectId(user._id) } },
        { new: true }
      );

    //update last acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(lastUser) },
        { $set: { user: ObjectId(user._id) } },
        { new: true }
      );

    //call GET and get all acceptance form for sessin's user
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    const responseAcceptanceform = (await response.json()).data;
    //check if response match last acceptanceform
    expect(responseAcceptanceform).toMatchObject(acceptanceforms[1]);
    //check if response not match first acceptanceform
    expect(responseAcceptanceform).not.toMatchObject(acceptanceforms[0]);

    //update first acceptanceform back 
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(user._id) },
        { $set: { user: ObjectId(firstUser) } },
        { new: true }
      );

    //update last acceptanceform back
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(user._id) },
        { $set: { user: ObjectId(lastUser) } },
        { new: true }
      );
  });

  test("get returns 404 if acceptanceforms not found", async ({
    request
  }) => {
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});
