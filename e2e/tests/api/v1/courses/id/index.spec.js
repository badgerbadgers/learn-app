import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/courses/[id]", () => {
  //GET TESTS

  test("returns only not deleted a course by id", async ({ request, db }) => {
    const randomCourse = await db.collection("courses").findOne({
      deleted_at: { $eq: null },
    });
    //call GET and get the course by id
    const response = await request.get(`/api/v1/courses/${randomCourse._id}`);

    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if one course is returned and it is not deleted
    expect(data).toMatchObject({ deleted_at: null });
    expect(data).toMatchObject(randomCourse);
  });

  test("does not return a deleted course", async ({ request, db }) => {
    const randomCourse = await db.collection("courses").findOne({
      deleted_at: { $ne: null },
    });
    //call GET and get the course by id
    const response = await request.get(`/api/v1/courses/${randomCourse._id}`);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  test("does not return a course with non existent id", async ({ request }) => {
    const randomNonExistentId = faker.database.mongodbObjectId();
    //call GET and get the course by id
    const response = await request.get(
      `/api/v1/courses/${randomNonExistentId}`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  // PATCH tests
  test("updates a course when all fields are properly given", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      course_name: faker.lorem.words(),
      lessons: [randomLesson._id],
    };
    const response = await request.patch(
      `/api/v1/courses/${randomCourse._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(updates);
    expect(responseData._id).toBe(randomCourse._id.toString());
    expect(responseData.lessons.length).toBe(updates.lessons.length);
    expect(responseData.slug).toBeDefined();
    const slug = responseData.course_name
      .trim()
      .replaceAll(" ", "-")
      .toLowerCase();
    expect(typeof responseData.slug).toBe("string");
    expect(responseData.slug).toBe(slug);
  });

  test("does not update a course when course_name is duplicate", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    // find a different course to test updates with duplicate course_name
    const randomCourseToUpdate = await db.collection("courses").findOne({
      $and: [
        { deleted_at: { $eq: null } },
        { course_name: { $ne: randomCourse.course_name } },
      ],
    });

    const updates = {
      course_name: randomCourse.course_name,
    };

    const response = await request.patch(
      `/api/v1/courses/${randomCourseToUpdate._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();
    // check if random course which was to be updated was not updated to the duplicate name
    const ifCourseUpdated = await db
      .collection("courses")
      .findOne({ _id: randomCourseToUpdate._id });
    expect(ifCourseUpdated.course_name).not.toBe(randomCourse.course_name);
  });

  test("does not update a course if at least one of provided lessons does not exist in db", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      lessons: [faker.database.mongodbObjectId(), randomLesson._id],
    };
    const response = await request.patch(`/api/v1/courses/${randomCourse._id}`, {
      data: updates,
    });
    expect(response.ok()).toBeFalsy();

    //confirm the course has not been updated
    const getResponse = await request.get(
      `/api/v1/courses/${randomCourse._id}`
    );
    expect(getResponse.ok()).toBeTruthy();

    const course = (await getResponse.json()).data;
    // using sort() to make sure array compared correctly if different order of elements provided
    expect(course.lessons.sort()).not.toStrictEqual(updates.lessons.sort());
  });

  test("does not update a course to add a field not existed in Course model", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      course_name: faker.lorem.words(),
      seats: faker.datatype.number({ min: 5, max: 100 }),
      name: faker.lorem.words(),
    };
    const response = await request.patch(
      `/api/v1/courses/${randomCourse._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeTruthy();

    const updatedCourse = (await response.json()).data;
    expect(updatedCourse.seats).toBeUndefined();
    expect(updatedCourse.name).toBeUndefined();
    const courseWithNotValidFields = await db
      .collection("courses")
      .findOne({ seats: updates.seats });
    expect(courseWithNotValidFields).toBeNull();
  });

  test("returns an error if update data not provided or unsupported properties are provided", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const updates = { seats: faker.datatype.number({ min: 5, max: 100 }) };
    const response = await request.patch(
      `/api/v1/courses/${randomCourse._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    // call api with empty updates object
    const responseToEmptyUpdate = await request.patch(
      `/api/v1/courses/${randomCourse._id}`,
      {
        data: {},
      }
    );
    expect(responseToEmptyUpdate.ok()).toBeFalsy();
  });

  // DELETE TESTS
  test("deletes a course by id by changing deleted_at property", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    //call DELETE to delete a course by id
    const response = await request.delete(
      `/api/v1/courses/${randomCourse._id}`
    );

    // check if response is OK
    expect(response.ok()).toBeTruthy();

    //check db if the course with given id has property deleted_at set to a Date object after deletion operation
    const deletedCourse = await db
      .collection("courses")
      .findOne({ _id: randomCourse._id });

    expect(deletedCourse.deleted_at instanceof Date).toBeTruthy();
  });

  test("returns 404 if course to delete is not found", async ({ request }) => {
    // check if response is falsy if course not found
    const nonExistedId = faker.database.mongodbObjectId();
    //call DELETE to delete a course by id
    const response = await request.delete(`/api/v1/courses/${nonExistedId}`);
    // check if response is NOT OK if the cohort not found in db
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});
