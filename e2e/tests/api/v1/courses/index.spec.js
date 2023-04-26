import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/courses", () => {
  //GET TESTS
  test("returns all courses", async ({ request, db }) => {
    // check how many not deleted courses in db
    const courseCount = await db
      .collection("courses")
      .countDocuments({ deleted_at: { $eq: null } });

    //call GET and get all the non-deleted courses (default for query parameter is false)
    const response = await request.get(`/api/v1/courses`);
    expect(response.ok()).toBeTruthy();

    const courses = (await response.json()).data;
    expect(courses).toHaveLength(courseCount);

    //check that all courses don't have a deleted_at set to a date
    courses.forEach((course) =>
      expect(course).toMatchObject({ deleted_at: null })
    );
  });

  test("supports deleted filter", async ({ request, db }) => {
    // check how many deleted courses in db
    const courseCount = await db
      .collection("courses")
      .countDocuments({ deleted_at: { $ne: null } });

    const response = await request.get("/api/v1/courses", {
      params: {
        deleted: true,
      },
    });
    expect(response.ok()).toBeTruthy();

    const courses = (await response.json()).data;

    courses.forEach((course) => expect(course.deleted_at).not.toBeNull());

    expect(courses).toHaveLength(courseCount);
  });

  test("supports not deleted filter", async ({ request, db }) => {
    // check how many deleted courses in db
    const courseCount = await db
      .collection("courses")
      .countDocuments({ deleted_at: { $eq: null } });

    const response = await request.get("/api/v1/courses", {
      params: {
        deleted: false,
      },
    });
    expect(response.ok()).toBeTruthy();

    const courses = (await response.json()).data;

    courses.forEach((course) => expect(course.deleted_at).toBeNull());

    expect(courses).toHaveLength(courseCount);
  });

  //POST TESTS
  test("creates a course when all fields are properly given", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: [randomLesson._id],
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newCourse);
    expect(responseData._id).toBeDefined();
    expect(responseData.lessons.length).toBe(newCourse.lessons.length);
    expect(responseData.slug).toBeDefined();
    expect(typeof responseData.slug).toBe("string");

    // delete created course from test db to prevent collisions with next tests
    await db
      .collection("courses")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });

  test("does not create a course when course_name is missing", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      lessons: [randomLesson._id],
    };
    const allCoursesCountBefore = await db
      .collection("courses")
      .countDocuments();

    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeFalsy();
    // confirm the course was not added to DB
    const allCoursesCountAfter = await db
      .collection("courses")
      .countDocuments();

    expect(allCoursesCountBefore).toEqual(allCoursesCountAfter);
  });

  test("does not create a course if at least one lesson id does not exist in db", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: [
        faker.database.mongodbObjectId(),
        /* fake mongo id */ randomLesson._id,
      ],
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeFalsy();

    // check if the course was not created
    const createdCourse = await db
      .collection("courses")
      .findOne({ course_name: newCourse.course_name });

    expect(createdCourse).toBeNull();
  });

  test("does not create a course if duplicate lesson ids provided", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: [randomLesson._id, randomLesson._id],
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeFalsy();

    // check if the course was not created
    const createdCourse = await db
      .collection("courses")
      .findOne({ course_name: newCourse.course_name });

    expect(createdCourse).toBeNull();
  });

  test("does not create a course if all: duplicate lesson ids, not existent lesson id and a valid lesson ids provided", async ({
    request,
    db,
  }) => {
    const randomLessons = await db
      .collection("lessons")
      .find({ deleted_at: { $eq: null } }, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(3)
      .toArray();

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: [
        faker.database.mongodbObjectId(),
        randomLessons[0]._id,
        randomLessons[0]._id, // duplicate
        randomLessons[1]._id,
        randomLessons[2]._id,
      ],
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeFalsy();

    // check if the course was not created
    const createdCourse = await db
      .collection("courses")
      .findOne({ course_name: newCourse.course_name });

    expect(createdCourse).toBeNull();
  });

  test("does not create a course with a field not existed in Course model", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: [randomLesson._id],
      fake_seats: faker.datatype.number({ min: 5, max: 100 }),
      fake_name: faker.lorem.words(),
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeTruthy();

    const createdCourse = (await response.json()).data;
    expect(createdCourse.course_name).toBe(newCourse.course_name);
    expect(createdCourse._id).toBeDefined();
    expect(createdCourse.fake_seats).toBeUndefined();
    expect(createdCourse.fake_name).toBeUndefined();

    // check if there was document created with non existent fields
    const nonExistentCourse = await db
      .collection("courses")
      .findOne({ fake_name: newCourse.fake_name });
    expect(nonExistentCourse).toBeNull();
  });

  test("does not create a course if deleted_at provided and set to non null value", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: [randomLesson._id],
      deleted_at: faker.date.future(1).toISOString(),
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeFalsy();

    const nonExistentCourse = await db
      .collection("courses")
      .findOne({ course_name: newCourse.course_name });
    expect(nonExistentCourse).toBeNull();
  });
});
