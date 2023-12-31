import { test, expect } from "e2e/fixtures/testAsUser";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";

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
      
    //check that we got back an acceptance form for the current user
    const acceptanceformData = (await response.json()).data;
    expect(acceptanceformData).toMatchObject(acceptanceform);
    expect(acceptanceformData).toMatchObject({ user: ObjectId(user._id)})

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

    const currentTime = faker.date.recent();
    const pastTime = faker.date.past();
    const latestObject = {
      completed_at: currentTime.toISOString(),
    };
    const pastTimeObject = {
      completed_at: pastTime.toISOString(),
    }
    //update first acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { _id: acceptanceforms[0]._id },
        { $set: { user: ObjectId(user._id), completed_at: pastTime } },
        { new: true }
      );

    //update last acceptanceform user to session user
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { _id: acceptanceforms[1]._id },
        { $set: { user: ObjectId(user._id), completed_at: currentTime } },
        { new: true }
      );
        
    //call GET and get all acceptance form for sessin's user
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();
    
    const responseAcceptanceform = (await response.json()).data;
    //check if response match lstest acceptanceform
    expect(responseAcceptanceform).toMatchObject(latestObject);
    expect(responseAcceptanceform).not.toMatchObject(pastTimeObject);
    //update first acceptanceform back
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { _id: acceptanceforms[0]._id },
        { $set: { user: ObjectId(acceptanceforms[0].user) } },
        { new: true }
      );

    //update last acceptanceform back
    await db
      .collection("acceptanceforms")
      .findOneAndUpdate(
        { _id: acceptanceforms[1]._id },
        { $set: { user: ObjectId(acceptanceforms[1].user) } },
        { new: true }
      );
  });
});
