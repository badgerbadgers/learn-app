import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { get } from "lodash";
import { ObjectId } from "mongodb";

test.describe("/api/v1/users/id", () => {
  //PATCH TESTS

  test("change a user name, email and gh", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    const updateUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      gh: faker.random.alphaNumeric(10),
    };

    //change user name, email, gh
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeTruthy();

    //get user by id and compare updated values
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
      email: faker.internet.email(),
    };

    //change user email
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeTruthy();
    //get user by id and compare updated values
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

  test("update with duplicate Github", async ({ request }) => {
    const existingUserId = "62a8bc08eee42d82d2d8d616";
    const updatingUserId = "62b22b42f4da59dbea98071b";

    //get user by existing userId and use Githab username
    const getResponseExistingUser = await request.get(
      `/api/v1/users/${existingUserId}`
    );
    expect(getResponseExistingUser.ok()).toBeTruthy();
    const existingUser = (await getResponseExistingUser.json()).data;

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
    const getResponse = await request.get(`/api/v1/users/${updatingUserId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(getUser.gh).not.toBe(existingUser.gh);
  });

  test("not found user by this userID", async ({ request }) => {
    //create not existing userID
    const userId = faker.random.numeric(8);

    const getResponse = await request.get(`/api/v1/users/${userId}`);

    expect(getResponse.ok()).toBeFalsy();
  });

  //DELETE TESTS

  test("delete user by id", async ({ request, db }) => {
    const userId = "62abc6581f78e685fe3c8066";

    //get user by id and check deleted_at 
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(getUser.deleted_at).toBe(null)

    //delete user by id
    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    const deletedUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    expect(deletedUser.deleted_at).not.toBe(null);
  });

  test("delete user if id doesn't exist", async ({ request, db }) => {
    const userId = faker.random.numeric(25);

    //delete user by userID
    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeFalsy();

  });

});
