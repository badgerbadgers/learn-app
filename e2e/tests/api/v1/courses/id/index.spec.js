import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

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

  test.only("does not return a course with non existent id", async ({
    request
  }) => {
    const randomNonExistentId = ObjectId("63e052cee6daad919e5cc2c5");
    //call GET and get the course by id
    const response = await request.get(
      `/api/v1/courses/${randomNonExistentId}`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  //   test("does not return a deleted cohort when supplied with deleted cohort id", async ({
  //     request,
  //     db,
  //   }) => {
  //     const cohorts = await db.collection("cohorts");
  //     // find random deleted cohort in db
  //     const randomDeletedCohort = await cohorts.findOne({
  //       deleted_at: { $ne: null },
  //     });

  //     //call GET and get a cohort by id
  //     const response = await request.get(
  //       `/api/v1/cohorts/${randomDeletedCohort._id}`
  //     );
  //     // check if response is 404
  //     expect(response.status()).toEqual(404);
  //   });

  //   // DELETE TESTS
  //   test("deletes a cohort by id by changing deleted_at property", async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCohort = await db.collection("cohorts").findOne();
  //     //call DELETE to delete a cohort by id
  //     const response = await request.delete(
  //       `/api/v1/cohorts/${randomCohort._id}`
  //     );

  //     // check if response is OK
  //     expect(response.ok()).toBeTruthy();

  //     // check db if the cohort with given id has property deleted_at set to a Date object after deletion operation
  //     const deletedCohort = await db
  //       .collection("cohorts")
  //       .findOne({ _id: randomCohort._id });

  //     expect(deletedCohort.deleted_at instanceof Date).toBeTruthy();
  //   });

  // TODO  - do we need a test like that?
  //   test("returns 404 if cohort to delete is not found", async ({ request }) => {
  //     // check if response is falsy if cohort not found
  //     const nonExistedId = faker.database.mongodbObjectId();
  //     //call DELETE to delete a cohort by id
  //     const response = await request.delete(`/api/v1/cohorts/${nonExistedId}`);
  //     // check if response is NOT OK if the cohort not found in db
  //     expect(response.ok()).toBeFalsy();
  //     expect(response.status()).toBe(404);
  //   });
});
