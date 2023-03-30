import { test, expect } from 'e2e/fixtures/testAsAdmin';
import { faker } from '@faker-js/faker';
const { ObjectId } = require('mongodb');

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

  test('does not return students of a deleted cohort', async ({
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

// PATCH TESTS
  test.only('adds students by ids to a cohort by provided cohort id', async ({
    request,
    db,
  }) => {
    // find a random cohort that has students in students field
    const randomCohort = await db
      .collection('cohorts')
      .findOne({ deleted_at: { $eq: null } });

    // find users from users db to add to cohort
    const usersToAdd = await db
      .collection('users')
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(4)
      .toArray();

    const parsedUsersToAdd = usersToAdd.map((user) => user._id.toString()); // extract ids of the students

    // find number of students which are already in the cohort
    const duplicateStudentsCount = parsedUsersToAdd.reduce((total, user) => {
      //  console.log(user, 'user');

      const ifFound = randomCohort.students?.find((student) => {
        return student.user.toString() === user;
      })
        ? 1
        : 0;

      total += ifFound;
      return total;
    }, 0);

    //call PATCH and get cohort's updated students list
    const response = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: { students: parsedUsersToAdd } }
    );

    const data = (await response.json()).data;

    // check if response is OK
    expect(response.ok()).toBeTruthy();

    // check if returned data is an array
    expect(data && Array.isArray(data)).toBe(true);
    // // check if array of students has expected length
    const expectedStudentsCount =
      randomCohort.students?.length +
        parsedUsersToAdd.length -
        duplicateStudentsCount || 0;

    expect(data.length).toBe(expectedStudentsCount);

    // check if each element of the data has a property 'user' and 'added_at'
    data.forEach((student) => {
      expect(student).toHaveProperty('user');
      expect(student).toHaveProperty('added_at');
    });

    // check if the request does not add users that do not exist in db
    const nonExistentUsers = [
      ObjectId('62a8bc08eee42d82d2d8d111'),
      ObjectId('55a5bc08eee42d82d2d8d555'),
    ];

    //call PATCH and get cohort's updated students list
    const responseNotAddedStudents = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: { students: nonExistentUsers } }
    );
    // check if response is OK
    expect(responseNotAddedStudents.ok()).toBeTruthy();
    const dataStudentsNotAdded = (await responseNotAddedStudents.json()).data;
    expect(dataStudentsNotAdded.length).toBe(data.length); // compare to the value after the first request which added students

    // check if the request does not add users to deleted cohort
    const randomDeletedCohort = await db
      .collection('cohorts')
      .findOne({ deleted_at: { $ne: null } });

    const responseForDeletedCohort = await request.patch(
      `/api/v1/cohorts/${randomDeletedCohort._id}/students`
    );

    // check if response is not OK
    expect(responseForDeletedCohort.ok()).not.toBeTruthy();
    expect(responseForDeletedCohort.status()).toBe(404);
  });






  
  // test('does not return students of a deleted cohort', async ({
  //   request,
  //   db,
  // }) => {
  //   const randomDeletedCohort = await db.collection('cohorts').findOne({
  //     deleted_at: { $ne: null },
  //   });
  //   const responseDeletedCohort = await request.get(
  //     `/api/v1/cohorts/${randomDeletedCohort._id}/students`
  //   );
  //   // test if api does not return ok response if cohort is deleted
  //   expect(responseDeletedCohort.ok()).not.toBeTruthy();
  //   expect(responseDeletedCohort.status()).toBe(404);
  // });

  //===============

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
