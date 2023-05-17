import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

test.describe("/api/v1/users/id", () => {
  //GET TESTS

  test("get user by ID", async ({ request, db }) => {
    const userId = "62b22b42f4da59dbea98071b";

    //get Github name from the user
    const userData = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    //get user by ID and check response and deleted_at
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(getUser.deleted_at).toBe(null);
    expect(getUser.name).toBe(userData.name);
    expect(getUser.email).toBe(userData.email);
    expect(getUser.gh).toBe(userData.gh);
  });

  test("get deleted User by ID", async ({ request, db }) => {
    const userId = "62d969ade411b721457b4d58";
    
    //GET User by ID and check deleted_at is null
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(getUser.deleted_at).toBe(null);

    //Delete User by ID
    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    //Verify deleteed_at is not null from data
    const deletedUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    expect(deletedUser.deleted_at).not.toBe(null);

    //Verify falsy Get deleted User by ID
    const getResponseDeletedUser = await request.get(`/api/v1/users/${userId}`);
    expect(getResponseDeletedUser.ok()).toBeFalsy();
    
  });

  test("get returns 404 if ID doesn't exist", async ({ request }) => {
    const userId = faker.database.mongodbObjectId();

    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeFalsy();
    expect(getResponse.status()).toBe(404);

  });

  //PATCH TESTS

  test("change a User name, email and gh", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      name: faker.name.fullName(),
      email: "example@example.com",
      gh: faker.random.alphaNumeric(10),
    };

    //Ghange User name, email, gh
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeTruthy();

    //GET User by ID and compare updated values
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(updateUser.name).toBe(getUser.name);
    expect(updateUser.email).toBe(getUser.email);
    expect(updateUser.gh).toBe(getUser.gh);
  });

  test("update only email", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      email: "example@example.com",
    };

    //Change User email
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeTruthy();
    //GET User by ID and compare updated values
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(updateUser.email).toBe(getUser.email);
  });

  test("update with empty name", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      name: "",
    };

    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeFalsy();
  });

  test("update with name and empty email", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      name: faker.name.fullName(),
      email: "",
    };

    //change user name and email
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeFalsy();
  });

  test("update with incorrect email", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      email: "A@b@c@example.com",
    };

    //change user name and email
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeFalsy();

    //confirm our user has not been updated
    const getResponse = await request.get("/api/v1/users");
    expect(getResponse.ok()).toBeTruthy();

    const users = (await getResponse.json()).data;
    expect(users).not.toContainEqual(
      expect.objectContaining({ email: updateUser.email })
    );
  });

  test("update with empty Github", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      gh: "",
    };

    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeFalsy();
  });

  test("update with the same Github name", async ({ request, db }) => {
    const userId = "62b22b42f4da59dbea98071b";

    //get Github name from the user
    const userData = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    //update user by the same Github username
    const updateUser = {
      gh: userData.gh,
    };
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });
    expect(patchResponse.ok()).toBeTruthy();

    //verify updated Github name
    const userUpdated = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    expect(userUpdated.gh).toBe(userData.gh);
  });

  test("update with duplicate Github", async ({ request, db }) => {
    const existingUserId = "62a8bc08eee42d82d2d8d616";
    const updatingUserId = "62b22b42f4da59dbea98071b";

    //get Github name from the user
    const existingUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(existingUserId) });

    //update user by existing Github username
    const updateUser = {
      gh: existingUser.gh,
    };

    const patchResponse = await request.patch(
      `/api/v1/users/${updatingUserId}`,
      {
        data: updateUser,
      }
    );
    expect(patchResponse.ok()).toBeFalsy();

    //Verify that updating user haven't duplicate Github username
    const updatedUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(updatingUserId) });
    expect(updatedUser.gh).not.toBe(existingUser.gh);
  });

  test("patch returns 404 if userID not found", async ({ request }) => {
    //Create not existing userID
    const userId = faker.database.mongodbObjectId();
    const updateUser = {
      email: "example@example.com",
    };

    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeFalsy();
    expect(patchResponse.status()).toBe(404);
  });

  test("undelete user by ID", async ({ request, db }) => {
    const userId = "634dd3eda86808cf9acb204f";

    //GET User by ID and check deleted_at
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(getUser.deleted_at).toBe(null);

    //DELETE User by ID
    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    const deletedUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    expect(deletedUser.deleted_at).not.toBe(null);

    //undelete User by ID
    const updateUser = {
      deleted_at: null,
    };

    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeTruthy();

    //GET User by ID and compare updated values
    const getResponseUndeletedUser = await request.get(`/api/v1/users/${userId}`);
    expect(getResponseUndeletedUser.ok()).toBeTruthy();
    const getUndeletedUser = (await getResponseUndeletedUser.json()).data;
    expect(getUndeletedUser.deleted_at).toBe(null);
  });

  //DELETE TESTS

  test("delete user by ID", async ({ request, db }) => {
    const userId = "62abc6581f78e685fe3c8066";

    //GET User by ID and check deleted_at
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(getUser.deleted_at).toBe(null);

    //DELETE User by ID
    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    const deletedUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    expect(deletedUser.deleted_at).not.toBe(null);
  });

  test("delete returns 404 if userID not found", async ({ request }) => {
    //Create not existing userID
    const userId = faker.database.mongodbObjectId();

    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeFalsy();
    expect(deleteResponse.status()).toBe(404);
  });
});
