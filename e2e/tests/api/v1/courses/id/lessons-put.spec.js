import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("PUT /api/v1/courses/[id]/lessons", () => {
  // PUT TESTS
  test("adds lessons to a course by provided course's id", async ({
    request,
    db,
  }) => {
    // find a random course
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    // find lessons from lessons db to add to the course
    const lessonsToAdd = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(4)
      .toArray();

    const parsedLessonsToAdd = lessonsToAdd.map((lesson) =>
      lesson._id.toString()
    ); // extract ids of the lessons

    //call PUT and get course's updated lessons list
    const response = await request.put(
      `/api/v1/courses/${randomCourse._id}/lessons`,
      { data: { lessons: parsedLessonsToAdd } }
    );

    const data = (await response.json()).data;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(data && Array.isArray(data)).toBe(true);

    // check if each element of the data has a property '_id'
    data.forEach((lesson) => {
      expect(lesson).toHaveProperty("_id");
    });

    // check if each lesson was added
    parsedLessonsToAdd.forEach((lesson) => {
      expect(lesson).toBe(
        data.find((lessonInCourse) => lessonInCourse._id === lesson)._id
      );
    });
  });

  test("does not add duplicated lessons if duplicated lesson ids are in update object", async ({
    request,
    db,
  }) => {
    // find a random lesson that has at least 3 lessons in lessons field
    const randomCourse = await db.collection("courses").findOne({
      deleted_at: { $eq: null },
      lessons: { $nin: [[], null] },
      $where: "this.lessons.length >= 3",
    });

    // find lessons from lessons db to add to course
    const lessonsToAdd = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(2)
      .toArray();

    const parsedLessonsToAdd = lessonsToAdd.map((lesson) =>
      lesson._id.toString()
    ); // extract ids of the lessons

    // extract 2 lessons from the course to be updated to create duplicate lessons
    const duplicateLessons = randomCourse.lessons
      .slice(0, 2) // get 2 lessons
      .map((lesson) => {
        if (lesson) {
          return lesson.toString();
        }
      });

    // call PUT and get course's updated lessons list
    const response = await request.put(
      `/api/v1/courses/${randomCourse._id}/lessons`,
      { data: { lessons: [...parsedLessonsToAdd, ...duplicateLessons] } }
    );

    const data = (await response.json()).data;

    expect(response.ok()).toBeTruthy();
    // check if lessons in updated course are not duplicated
    [...parsedLessonsToAdd, ...duplicateLessons].forEach((lsn) => {
      const count = data.filter((lesson) => {
        return lesson._id === lsn;
      }).length;
      expect(count).toBe(1);
    });
  });

  test("does not adds non existent lessons to a course by provided course id", async ({
    request,
    db,
  }) => {
    // find a random course
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null }, lessons: { $nin: [[], null] } });

    // find lessons from lessons db to add to lesson
    const lessonsToAdd = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(4)
      .toArray();

    const parsedLessonsToAdd = lessonsToAdd.map((lesson) =>
      lesson._id.toString()
    ); // extract ids of the lessons

    // check if the request does not add lessons that do not exist in db, mock data
    const nonExistentLessons = [
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
    ];

    //call put and get course's updated lessons list
    const responseNotAddedLessons = await request.put(
      `/api/v1/courses/${randomCourse._id}/lessons`,
      { data: { lessons: [...nonExistentLessons, ...parsedLessonsToAdd] } }
    );
    // check if response is OK
    expect(responseNotAddedLessons.ok()).toBeFalsy();

    const updatedCourse = await db
      .collection("courses")
      .findOne({ _id: randomCourse._id });

    // compare courses lessons before and after updates which included non existent lessons ids
    expect(updatedCourse.lessons.sort()).toStrictEqual(
      randomCourse.lessons.sort()
    );
  });

  test("returns error if only non existent lessons to add to a course provided", async ({
    request,
    db,
  }) => {
    // find a random course
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    // check if the request does not add lessons that do not exist in db, mock data
    const nonExistentLessons = [
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
    ];

    //call lessons and get courses's updated lessons list
    const responseNotAddedLessons = await request.put(
      `/api/v1/courses/${randomCourse._id}/lessons`,
      { data: { lessons: nonExistentLessons } }
    );
    // check if response is not OK
    expect(responseNotAddedLessons.ok()).toBeFalsy();
  });

  test("does not add lessons to deleted course", async ({ request, db }) => {
    const randomDeletedCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $ne: null } });
    // find lessons from lessons db to add to lesson
    const lessonsToAdd = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(4)
      .toArray();

    const parsedLessonsToAdd = lessonsToAdd.map((lesson) =>
      lesson._id.toString()
    ); // extract ids of the lessons

    const responseForDeletedCourse = await request.put(
      `/api/v1/courses/${randomDeletedCourse._id}/lessons`,
      { data: { lessons: parsedLessonsToAdd } }
    );

    // check if response is not OK
    expect(responseForDeletedCourse.ok()).not.toBeTruthy();
    expect(responseForDeletedCourse.status()).toBe(404);
  });

  test("returns error if array of lessons to add not provided", async ({
    request,
    db,
  }) => {
    // find a random course
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    //call PUT to add lessons of a course by id
    const responseNoLessons = await request.put(
      `/api/v1/courses/${randomCourse._id}/lessons`,
      { data: {} }
    );
    expect(responseNoLessons.ok()).not.toBeTruthy();
    expect(responseNoLessons.status()).toBe(400);

    //call PUT to add lessons of a course by id
    const responseLessonsEmpty = await request.put(
      `/api/v1/courses/${randomCourse._id}/lessons`,
      { data: { lessons: [] } }
    );
    expect(responseLessonsEmpty.ok()).not.toBeTruthy();
    expect(responseLessonsEmpty.status()).toBe(400);
  });
});
