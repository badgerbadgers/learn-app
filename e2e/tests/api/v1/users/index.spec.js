import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

test.describe("/api/v1/users", () => {
  //GET TESTS

  test("returns all users", async ({ request }) => {
    //call GET and get all the non-deleted users
    const response = await request.get(`/api/v1/users`);
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    //check that all users don't have a deleted_at set
    for (const u of users) {
      expect(u).toMatchObject({ deleted_at: null });
    }
  });

  test("supports deleted filter", async ({ request }) => {
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

    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("635841bd9be844015c74719a") });

    const mentors = cohort.mentors;

    expect(users).toHaveLength(mentors.length);
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

    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("635841bd9be844015c74719a") });

    const students = cohort.students;

    expect(users).toHaveLength(students.length);
  });

  test("returns an empty array when there are no results", async ({
    request,
  }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "6356b06ba070b6cfbfbdf050",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    expect(users).toHaveLength(0);
  });

  test("supports cohort filter", async ({ request, db }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        cohort: "632e0184290d23ac4c005e27",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    const cohort = await db
      .collection("cohorts")
      .findOne({ _id: ObjectId("632e0184290d23ac4c005e27") });

    const students = cohort.students;
    const mentors = cohort.mentors;
    const len = students.length + mentors.length;

    expect(users).toHaveLength(len);
  });

  test("supports course filter ", async ({ request }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        course: "62e056cee6daad619e5cc2c3",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    expect(users).toHaveLength(7);
  });

  test("supports students filter ", async ({ request }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        role: "students",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    expect(users).toHaveLength(8);
  });

  test("supports mentors filter ", async ({ request }) => {
    const response = await request.get("/api/v1/users", {
      params: {
        role: "mentors",
      },
    });
    expect(response.ok()).toBeTruthy();

    const users = (await response.json()).data;

    expect(users).toHaveLength(5);
  });

  //POST TESTS
  test("creates a user when the fields name, email, gh are properly given", async ({
    request,
    db,
  }) => {
    const newUser = {
      name: faker.lorem.words(),
      email: faker.lorem.words(),
      gh: faker.lorem.words(),
    };

    const response = await request.post(`/api/v1/users`, {
      data: newUser,
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newUser);
    expect(responseData._id).toBeDefined();

    //delete newUser
    await db
      .collection("cohorts")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });

  test("does not create a user when name is missing", async ({ request }) => {
    const newUser = {
      email: faker.lorem.words(),
      gh: faker.lorem.words(),
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

  test("does not create a user email is missing", async ({ request }) => {
    const newUser = {
      name: faker.lorem.words(),
      gh: faker.lorem.words(),
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
      expect.objectContaining({ email: newUser.email })
    );
  });

  test("does not create a user when github is missing", async ({ request }) => {
    const newUser = {
      name: faker.lorem.words(),
      email: faker.lorem.words(),
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
      expect.objectContaining({ gh: newUser.gh })
    );
  });

  test("does not allow creating a user with a non-unique github", async ({
    request,
    db,
  }) => {
    const user = await db.collection("users").findOne();

    const newUser = {
      name: faker.lorem.words(),
      email: faker.lorem.words(),
      gh: user.gh,
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

  test.fixme(
    "does not save into the database extra fields are sent ",
    async ({ request }) => {
      const newUser = {
        name: faker.lorem.words(),
        email: faker.lorem.words(),
        gh: faker.lorem.words(),
        nonfiled: faker.lorem.words(),
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
        expect.objectContaining({ gh: newUser.gh })
      );
    }
  );
});
