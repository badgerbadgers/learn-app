import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

test.describe("/api/v1/users", () => {
  //GET TESTS

  test("returns the list of users", async ({ request }) => {
    //call GET and get all the non-deleted users
    const response = await request.get(`/api/users`);
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
