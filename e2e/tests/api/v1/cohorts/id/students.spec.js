import { test, expect } from 'e2e/fixtures/testAsAdmin';
import { faker } from '@faker-js/faker';

test.describe('/api/v1/cohorts/[id]/students', () => {
  //GET TESTS

  test('returns all students of a not deleted cohort by cohort id', async ({
    request,
    db,
  }) => {
    // find a random cohort that has students in students field
    const randomCohort = await db.collection('cohorts').findOne({
      $and: [
        { deleted_at: { $eq: null } },
        { students: { $ne: [] } },
        { students: { $ne: null } },
      ],
    });

    //call GET and get the non-deleted cohort by id
    const response = await request.get(
      `/api/v1/cohorts/${randomCohort._id}/students`
    );

    const data = (await response.json()).data;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(data && Array.isArray(data)).toBe(true);
    // check if array of students has expected length
    expect(data).toHaveLength(randomCohort.students.length);
    // check if each element of the array has a property 'user' and 'added_at'
    data.forEach((student) => {
      expect(student).toHaveProperty('user');
      expect(student).toHaveProperty('added_at');
    });

    const randomCohortWithNoStudents = await db
      .collection('cohorts')
      .findOne({ deleted_at: { $eq: null }, students: { $eq: [] } });

    const responseNoStudents = await request.get(
      `/api/v1/cohorts/${randomCohortWithNoStudents._id}/students`
    );
    const noStudentsData = (await responseNoStudents.json()).data;
    // check if response is OK
    expect(responseNoStudents.ok()).toBeTruthy();
    // check an empty array is returned
    expect(noStudentsData).toHaveLength(0);
  });

  test.only('does not return students of a deleted cohort', async ({
    request,
    db,
  }) => {
    const randomDeletedCohort = await db.collection('cohorts').findOne({
      deleted_at: { $ne: null },
    });
    const responseDeletedCohort = await request.get(
      `/api/v1/cohorts/${randomDeletedCohort._id}/students`
    );
    // test if api does not return ok response if cohort is deleted
    expect(responseDeletedCohort.ok()).not.toBeTruthy();
    expect(responseDeletedCohort.status()).toBe(404);
  });

  // DELETE TESTS
  //   test('deletes a cohort by id by changing deleted_at property', async ({
  //     request,
  //     db,
  //   }) => {
  //     const randomCohort = await db.collection('cohorts').findOne();
  //     //call DELETE to delete a cohort by id
  //     const response = await request.delete(
  //       `/api/v1/cohorts/${randomCohort._id}`
  //     );

  //     // check if response is OK
  //     expect(response.ok()).toBeTruthy();

  //     // check db if the cohort with given id has property deleted_at set to a Date object after deletion operation
  //     const deletedCohort = await db
  //       .collection('cohorts')
  //       .findOne({ _id: randomCohort._id });

  //     expect(deletedCohort.deleted_at instanceof Date).toBeTruthy();
  //   });

  //   // TODO  - do we need a test like that?
  //   test('returns 404 if cohort to delete is not found', async ({
  //     request,
  //   }) => {
  //     // check if response is falsy if cohort not found
  //     const nonExistedId = faker.database.mongodbObjectId();
  //     //call DELETE to delete a cohort by id
  //     const response = await request.delete(`/api/v1/cohorts/${nonExistedId}`);
  //     console.log(response);
  //     // check if response is NOT OK if the cohort not found in db
  //     expect(response.ok()).toBeFalsy();
  //     expect(response.status()).toBe(404);
  //   });
});
