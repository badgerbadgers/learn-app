import { test, expect } from "e2e/fixtures/testAsUser";
import { ObjectId } from "mongodb";

test.describe.serial("/api/v1/users/acceptanceforms", () => {
  //GET TESTS

  test("returns acceptanceform for user by session", async ({
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

  test("returns latest acceptanceform for user by session", async ({
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
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
    const latestObject = {
      completed_at: currentTime.toISOString(),
    };
    const oneHourAgoObject = {
      completed_at: oneHourAgo.toISOString(),
    };
    //update first acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(firstUser) },
        { $set: { user: ObjectId(user._id), completed_at: oneHourAgo } },
        { new: true }
      );

    //update last acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { user: ObjectId(lastUser) },
        { $set: { user: ObjectId(user._id), completed_at: currentTime } },
        { new: true }
      );
        
    //call GET and get all acceptance form for sessin's user
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();
    
    const responseAcceptanceform = (await response.json()).data;
    //check if response match lstest acceptanceform
    expect(responseAcceptanceform).toMatchObject(latestObject);
    expect(responseAcceptanceform).not.toMatchObject(oneHourAgoObject);

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
});
