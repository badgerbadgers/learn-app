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

    expect(responseData.lessons.length).toBe(1);

    expect(responseData.slug).toBeDefined();
    expect(typeof responseData.slug).toBe("string");
    // delete created course from test db to prevent collisions with next tests
    await db
      .collection("courses")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });

  test.only("does not create a course when course_name is missing", async ({
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

  test("does not create a course if at least one of provided lessons don't exist in db", async ({
    request,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const newCourse = {
      course_name: faker.lorem.words(),
      lessons: ["42e46dc669dd077fc82fbffa", randomLesson._id],
    };
    const response = await request.post(`/api/v1/courses`, {
      data: newCourse,
    });
    expect(response.ok()).toBeFalsy();

    //confirm the course has not been created
    const getResponse = await request.get(`/api/v1/courses`);
    expect(getResponse.ok()).toBeTruthy();

    const courses = (await getResponse.json()).data;
    expect(courses).not.toContainEqual(
      expect.objectContaining({ course_name: newCourse.course_name })
    );
  });
});
