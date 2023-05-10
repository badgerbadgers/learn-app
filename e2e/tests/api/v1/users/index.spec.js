import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

test.describe("/api/v1/users", () => {
  //GET TESTS

  test("returns the list of users", async ({ request }) => {
    //call GET and get all the non-deleted users
    const response = await request.get("/api/v1/users");
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    //check that all users don't have a deleted_at set
    for (const u of users) {
      expect(u).toMatchObject({ deleted_at: null });
    }
  });

  test("supports deleted filter", async ({ request, db }) => {
    const userId = "62abc6581f78e685fe3c8066";

    //DELETE User by ID
    const deleteResponse = await request.delete(`/api/v1/users/${userId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    const deletedUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    expect(deletedUser.deleted_at).not.toBe(null);

    //Get deleted users
    const response = await request.get("/api/v1/users", {
      params: {
        deleted: true,
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    for (const u of users) {
      expect(u.deleted_at).not.toBeNull();
    }

    //Verify that the deleted user returned in results as deleted
    const responseDeletedUser = await request.get(`/api/v1/users/${userId}`);
    expect(responseDeletedUser.status()).toEqual(404);

    //undelete User by ID
    const updateUser = {
      deleted_at: null,
    };

    const patchResponse = await request.patch(`/api/v1/users/${userId}`, {
      data: updateUser,
    });

    expect(patchResponse.ok()).toBeTruthy();

    //Verify that the undeleted user returned in results 
    const responseUndeletedUser = await request.get(`/api/v1/users/${userId}`);
    expect(responseUndeletedUser.ok()).toBeTruthy();

    //GET User by ID and compare updated values
    const getResponseUndeletedUser = await request.get(
      `/api/v1/users/${userId}`
    );
    expect(getResponseUndeletedUser.ok()).toBeTruthy();
    const getUndeletedUser = (await getResponseUndeletedUser.json()).data;
    expect(getUndeletedUser.deleted_at).toBe(null);
  });

  test("supports cohort filter", async ({
    request,
    db,
  }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "635841bd9be844015c74719a",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    //find cohort by id from db
    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("635841bd9be844015c74719a") });

    //find all mentors and all students from the cohort
    const students = cohort.students;
    const mentors = cohort.mentors;

    //check if user contains in the list of mentors or students
    for (const u of users) {
      expect(students).toContainEqual(
        expect.objectContaining({ user: new ObjectId(u._id) }) ||
          expect(mentors).toContainEqual({ user: new ObjectId(u._id) })
      );
    }
  });

  test("supports cohort filter and mentors role filter", async ({
    request,
    db,
  }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "635841bd9be844015c74719a",
        role: "mentors",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    //find cohort by id from db
    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("635841bd9be844015c74719a") });

    //find all mentors from the cohort
    const mentors = cohort.mentors;

    //check if user contains in the list of mentors
    for(const u of users) {
       expect(mentors).toContainEqual({ user: new ObjectId(u._id) });
    }
  });

  test("supports cohort filter and students role filter", async ({
    request,
    db,
  }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "635841bd9be844015c74719a",
        role: "students",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    //find cohort by id from db
    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("635841bd9be844015c74719a") });

    //find all mentors from the cohort
    const students = cohort.students;

    //check if user contains in the list of mentors
    for (const u of users) {
      expect(students).toContainEqual(expect.objectContaining({ user: new ObjectId(u._id) })) ;
    }
  });

  test("supports cohort filter and course filter", async ({
    request,
    db,
  }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "635841bd9be844015c74719a",
        course: "62e056cee6daad619e5cc2c5",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    //find cohort by id from db
    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("635841bd9be844015c74719a") });

    //find all mentors from the cohort
    const students = cohort.students;
    const mentors = cohort.mentors;

    //check if user contains in the list of mentors
    for (const u of users) {
      expect(students).toContainEqual(
        expect.objectContaining({ user: new ObjectId(u._id) }) || expect(mentors).toContainEqual({ user: new ObjectId(u._id) })
      );
    }

  });

  test("returns an empty array when there are no results", async ({
    request,
  }) => {
    //choose by a course not in the cohort
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "635841bd9be844015c74719a",
        course: "62e056cee6daad619e5cc2c3",
      },
    });
    expect(response.ok()).toBeTruthy();

    expect((await response.json()).data).toHaveLength(0);   
  });
});

//POST TESTS
  test("creates a user when the fields name, email, gh are properly given", async ({ request, db }) => {
    const newUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      gh: faker.random.alphaNumeric(10),
    };

    const response = await request.post(`/api/v1/users`, {
      data: newUser
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newUser);
    expect(responseData._id).toBeDefined();

    //delete newUser
    await db
      .collection("users")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });

  test("does not create a user when name is missing", async ({
    request,
  }) => {
    const newUser = {
      email: faker.internet.email(),
      gh: faker.random.alphaNumeric(10),
    };

    const response = await request.post(`/api/v1/users`, {
      data: newUser,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our user has not been created
    const getResponse = await request.get(`/api/v1/users`);
    expect(getResponse.ok()).toBeTruthy();

    const users = (await getResponse.json()).data;
    expect(users).not.toContainEqual(
      expect.objectContaining({ name: newUser.name })
    );
  });

  test("does not create a user email is missing", async ({
    request,
  }) => {
    const newUser = {
      name: faker.name.fullName(),
      gh: faker.random.alphaNumeric(10),
    };

    const response = await request.post("/api/v1/users", {
      data: newUser,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our user has not been created
    const getResponse = await request.get("/api/v1/users");
    expect(getResponse.ok()).toBeTruthy();

    const users = (await getResponse.json()).data;
    expect(users).not.toContainEqual(
      expect.objectContaining({ email: newUser.email })
    );
  });

  test("does not create a user when github is missing", async ({
    request,
  }) => {
    const newUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
    };

    const response = await request.post("/api/v1/users", {
      data: newUser,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our user has not been created
    const getResponse = await request.get("/api/v1/users");
    expect(getResponse.ok()).toBeTruthy();

    const users = (await getResponse.json()).data;
    expect(users).not.toContainEqual(
      expect.objectContaining({ gh: newUser.gh })
    );
  });

  test(
    "does not allow creating a user with a non-unique github",
    async ({ request, db }) => {
      const user = await db.collection("users").findOne();

      const newUser = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        gh: user.gh,
      };

      const response = await request.post("/api/v1/users", {
        data: newUser,
      });
      expect(response.ok()).toBeFalsy();

      //confirm our user has not been created
      const getResponse = await request.get("/api/v1/users");
      expect(getResponse.ok()).toBeTruthy();

      const users = (await getResponse.json()).data;
      expect(users).not.toContainEqual(
        expect.objectContaining({ name: newUser.name })
      );
    });

    test("does not save into the database extra fields that are sent", async ({
      request, db
    }) => {
      const newUser = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        gh: faker.random.alphaNumeric(10),
        extraField: faker.random.alphaNumeric(10),
      };

      const response = await request.post(`/api/v1/users`, {
        data: newUser,
      });
      expect(response.ok()).toBeTruthy();

      const responseData = (await response.json()).data;
      expect(responseData).not.toMatchObject(newUser);
      expect(responseData._id).toBeDefined();
      expect(responseData.extraField).toBeUndefined();
      expect(responseData.email).toBe(newUser.email)

      //delete newUser
      await db
        .collection("users")
        .deleteOne({ _id: ObjectId(responseData._id) });
    });