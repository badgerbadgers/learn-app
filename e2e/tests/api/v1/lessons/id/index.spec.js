import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/lessons/[id]", () => {
  //GET TESTS

  test.only("returns only not deleted lesson by id", async ({
    request,
    db,
  }) => {
    const randomLesson = await db.collection("lessons").findOne({
      deleted_at: { $eq: null },
    });
    //call GET and get the lesson by id
    const response = await request.get(`/api/v1/lessons/${randomLesson._id}`);

    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if one lesson is returned and it is not deleted
    expect(data).toMatchObject({ deleted_at: null });
    expect(data).toMatchObject(randomLesson);
    expect(data.title).toBeDefined();
    expect(data._id).toBeDefined();
  });

  test("does not return a deleted lesson", async ({ request, db }) => {
    const randomLesson = await db.collection("lessons").findOne({
      deleted_at: { $ne: null },
    });
    //call GET and get the lesson by id
    const response = await request.get(`/api/v1/lessons/${randomLesson._id}`);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  test("does not return a lesson with non existent id", async ({ request }) => {
    const randomNonExistentId = faker.database.mongodbObjectId();
    //call GET and get the course by id
    const response = await request.get(
      `/api/v1/lessons/${randomNonExistentId}`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  //   // PATCH tests
  //   test("updates a course when all fields are properly given", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const randomLesson = await db
  //       .collection("lessons")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const updates = {
  //       course_name: faker.lorem.words(),
  //       lessons: [randomLesson._id],
  //     };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeTruthy();
  //     const responseData = (await response.json()).data;
  //     expect(responseData).toMatchObject(updates);
  //     expect(responseData._id).toBe(randomCourse._id.toString());
  //     expect(responseData.lessons.length).toBe(updates.lessons.length);
  //     expect(responseData.slug).toBeDefined();
  //     const slug = responseData.course_name
  //       .trim()
  //       .replaceAll(" ", "-")
  //       .toLowerCase();
  //     expect(typeof responseData.slug).toBe("string");
  //     expect(responseData.slug).toBe(slug);
  //   });

  //   test("does not update a course when course_name is duplicate", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     // find a different course to test updates with duplicate course_name
  //     const randomCourseToUpdate = await db.collection("courses").findOne({
  //       $and: [
  //         { deleted_at: { $eq: null } },
  //         { course_name: { $ne: randomCourse.course_name } },
  //       ],
  //     });

  //     const updates = {
  //       course_name: randomCourse.course_name,
  //     };

  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourseToUpdate._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeFalsy();
  //     // check if random course which was to be updated was not updated to the duplicate name
  //     const ifCourseUpdated = await db
  //       .collection("courses")
  //       .findOne({ _id: randomCourseToUpdate._id });
  //     expect(ifCourseUpdated.course_name).not.toBe(randomCourse.course_name);
  //   });

  //   test("does not update a course with field not existed in Course model", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const updates = {
  //       course_name: faker.lorem.words(),
  //       fake_seats: faker.datatype.number({ min: 5, max: 100 }),
  //       fake_name: faker.lorem.words(),
  //     };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeTruthy();

  //     const updatedCourse = (await response.json()).data;
  //     expect(updatedCourse.course_name).toBe(updates.course_name);
  //     expect(updatedCourse.fake_seats).toBeUndefined();
  //     expect(updatedCourse.fake_name).toBeUndefined();
  //     const courseWithNotValidFields = await db
  //       .collection("courses")
  //       .findOne({ fake_seats: updates.fake_seats });
  //     expect(courseWithNotValidFields).toBeNull();
  //   });

  //   test("does not update a course  if not all lessons ids exist in db", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const randomLesson = await db
  //       .collection("lessons")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const updates = {
  //       lessons: [
  //         faker.database.mongodbObjectId(),
  //         /* fake mongo id */ randomLesson._id,
  //       ],
  //     };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeFalsy();

  //     //confirm the course  was not updated
  //     const getResponse = await request.get(
  //       `/api/v1/courses/${randomCourse._id}`
  //     );
  //     expect(getResponse.ok()).toBeTruthy();

  //     const course = (await getResponse.json()).data;
  //     // using sort() to make sure array compared correctly if different order of elements provided
  //     expect(course.lessons.sort()).not.toStrictEqual(updates.lessons.sort());
  //   });

  //   test("does not update a course if all: duplicate lesson ids, not existent lesson id and a valid lesson ids provided", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomLessons = await db
  //       .collection("lessons")
  //       .find({ deleted_at: { $eq: null } }, { projection: { _id: 1, name: 1 } }) // return only ids
  //       .limit(3)
  //       .toArray();

  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const nonExistentLesson = faker.database.mongodbObjectId();
  //     const updates = {
  //       course_name: faker.lorem.words(),
  //       lessons: [
  //         nonExistentLesson,
  //         randomLessons[0]._id,
  //         randomLessons[0]._id, // duplicate
  //         randomLessons[1]._id,
  //         randomLessons[2]._id,
  //       ],
  //     };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeFalsy();

  //     // check if the course was not updated
  //     const courseAfterUpdate = await db
  //       .collection("courses")
  //       .findOne({ _id: randomCourse._id });
  //     // check if the course was not updated
  //     const notExistentCourse = await db
  //       .collection("courses")
  //       .findOne({ course_name: updates.course_name });

  //     expect(notExistentCourse).toBeNull();
  //     expect(courseAfterUpdate).not.toMatchObject(updates);
  //     expect(
  //       courseAfterUpdate.lessons.find(
  //         (lesson) => nonExistentLesson.toString() === lesson
  //       )
  //     ).toBeFalsy();
  //   });

  //   test("returns an error if update data not provided or unsupported properties are provided", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const updates = { seats: faker.datatype.number({ min: 5, max: 100 }) };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeFalsy();

  //     // call api with empty updates object
  //     const responseToEmptyUpdate = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: {},
  //       }
  //     );
  //     expect(responseToEmptyUpdate.ok()).toBeFalsy();
  //   });

  //   test("does not let delete (soft delete) course in PATCH and returns an error if deleted_at provided with a date object", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     const updates = { deleted_at: faker.date.recent() };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeFalsy();
  //   });

  //   test("undeletes a course if deleted_at set to null provided in updates", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $ne: null } });

  //     const updates = { deleted_at: null };
  //     const response = await request.patch(
  //       `/api/v1/courses/${randomCourse._id}`,
  //       {
  //         data: updates,
  //       }
  //     );
  //     expect(response.ok()).toBeTruthy();
  //     const data = (await response.json()).data;
  //     expect(data.deleted_at).toBeNull();
  //   });

  //   // DELETE TESTS
  //   test("deletes a course by id by changing deleted_at property", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCourse = await db
  //       .collection("courses")
  //       .findOne({ deleted_at: { $eq: null } });

  //     //call DELETE to delete a course by id
  //     const response = await request.delete(
  //       `/api/v1/courses/${randomCourse._id}`
  //     );

  //     // check if response is OK
  //     expect(response.ok()).toBeTruthy();

  //     //check db if the course with given id has property deleted_at set to a Date object after deletion operation
  //     const deletedCourse = await db
  //       .collection("courses")
  //       .findOne({ _id: randomCourse._id });

  //     expect(deletedCourse.deleted_at instanceof Date).toBeTruthy();
  //   });

  //   test("returns 404 if course to delete is not found", async ({ request }) => {
  //     // check if response is falsy if course not found
  //     const nonExistedId = faker.database.mongodbObjectId();
  //     //call DELETE to delete a course by id
  //     const response = await request.delete(`/api/v1/courses/${nonExistedId}`);
  //     // check if response is NOT OK if the cohort not found in db
  //     expect(response.ok()).toBeFalsy();
  //     expect(response.status()).toBe(404);
  //   });
});
