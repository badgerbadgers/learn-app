import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/cohorts/[id]/students", () => {
  //GET TESTS
  test("returns all students of a not deleted cohort by cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has students in students field
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
      students: { $nin: [[], null] },
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
      expect(student).toHaveProperty("user");
      expect(student).toHaveProperty("added_at");
    });
  });

  test("returns empty array if cohort has not students", async ({
    request,
    db,
  }) => {
    const randomCohortWithNoStudents = await db
      .collection("cohorts")
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

  test("does not return students of a deleted cohort", async ({
    request,
    db,
  }) => {
    const randomDeletedCohort = await db.collection("cohorts").findOne({
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
  test("adds students by ids to a cohort by provided cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has students in students field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, students: { $nin: [[], null] } });

    // find users from users db to add to cohort
    const usersToAdd = await db
      .collection("users")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(4)
      .toArray();

    const parsedUsersToAdd = usersToAdd.map((user) => user._id.toString()); // extract ids of the students

    // find number of students which are already in the cohort
    const duplicateStudentsCount = parsedUsersToAdd.reduce((total, user) => {
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
      expect(student).toHaveProperty("user");
      expect(student).toHaveProperty("added_at");
    });
    // check if each user was added
    parsedUsersToAdd.forEach((user) => {
      expect(user).toBe(
        data
          .filter((userInCohort) => userInCohort.user !== null) // discard users in db which are null
          .find((userInCohort) => userInCohort.user._id === user).user._id
      );
    });
  });

  test("does not add duplicated students if duplicated students are in update object", async ({
    request,
    db,
  }) => {
    // find a random cohort that has students in students field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, students: { $nin: [[], null] } });

    // find users from users db to add to cohort
    const usersToAdd = await db
      .collection("users")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(2)
      .toArray();

    const parsedUsersToAdd = usersToAdd.map((user) => user._id.toString()); // extract ids of the students
    // extract 2 students from the cohort to be updated to create duplicate students
    const duplicateStudents = randomCohort.students
      .map((student) => {
        if (student.user) {
          return student.user.toString();
        }
      })
      .slice(0, 2); // get 2 students

    // call PATCH and get cohort's updated students list
    const response = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: { students: [...parsedUsersToAdd, ...duplicateStudents] } }
    );

    const data = (await response.json()).data;
    expect(response.ok()).toBeTruthy();
    // check if students in updated cohort are not duplicated
    [...parsedUsersToAdd, ...duplicateStudents].forEach((user) => {
      const count = data.filter((student) => student.user?._id === user).length;
      expect(count).toBe(1);
    });
  });

  test("does not adds non existent students to a cohort by provided cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has students in students field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    // check if the request does not add users that do not exist in db, mock data
    const nonExistentUsers = [
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
    ];

    //call PATCH and get cohort's updated students list
    const responseNotAddedStudents = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: { students: nonExistentUsers } }
    );
    // check if response is not OK
    expect(responseNotAddedStudents.ok()).toBeFalsy();
    // find the cohort in db after update and make sure the non existed users were not added
    const updatedCohort = await db
      .collection("cohorts")
      .findOne({ _id: randomCohort._id });

    // check if non-existent users were not added to students list
    expect(
      updatedCohort.students.find(
        (person) =>
          person.user?._id === nonExistentUsers[0] ||
          person.user?._id === nonExistentUsers[1]
      )
    ).toBeFalsy();
  });

  test("does not add users to deleted cohort", async ({ request, db }) => {
    // check if the request does not add users to deleted cohort
    const randomDeletedCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $ne: null } });

    const responseForDeletedCohort = await request.patch(
      `/api/v1/cohorts/${randomDeletedCohort._id}/students`,
      { data: { students: [] } }
    );
    // check if response is not OK
    expect(responseForDeletedCohort.ok()).not.toBeTruthy();
    expect(responseForDeletedCohort.status()).toBe(404);
  });

  test("returns error if array of students to add not provided", async ({
    request,
    db,
  }) => {
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    //call DELETE to delete students of a cohort by id
    const responseNoStudents = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: {} }
    );
    expect(responseNoStudents.ok()).not.toBeTruthy();
    expect(responseNoStudents.status()).toBe(400);
  });

  // DELETE TESTS
  test("deletes students from a cohort by cohort's id", async ({
    request,
    db,
  }) => {
    const randomCohort = await db
      .collection("cohorts")
      .findOne({
        deleted_at: { $eq: null },
        $where: "this.students.length > 1",
      });

    // filter the array to get students with ids
    const parsedUsersToDelete = randomCohort.students.reduce(
      (total, { user }) => {
        if (user) {
          total.push(user.toString());
        }
        return total;
      },
      []
    );

    //call DELETE to delete students of a cohort by id
    const response = await request.delete(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: { students: [parsedUsersToDelete[0]] } } // delete one user
    );

    // check if response is OK
    expect(response.ok()).toBeTruthy();

    // retrieve cohort from db to check if the student was deleted
    const updatedCohort1 = await db
      .collection("cohorts")
      .findOne({ _id: randomCohort._id });

    // check if one student was deleted
    expect(updatedCohort1.students.length).toBe(
      randomCohort.students.length - 1
    );
    //call DELETE to delete students of a cohort by id
    const responseDeleteAll = await request.delete(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: { students: parsedUsersToDelete } }
    );
    // check if response is OK
    expect(responseDeleteAll.ok()).toBeTruthy();
    const updatedCohort2 = await db
      .collection("cohorts")
      .findOne({ _id: randomCohort._id });
    // check if all students were deleted
    expect(updatedCohort2.students.length).toBe(0);
  });
  test("returns error if array of students to delete not provided", async ({
    request,
    db,
  }) => {
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ $where: "this.students.length > 1" });

    //call DELETE to delete students of a cohort by id
    const responseNoStudents = await request.delete(
      `/api/v1/cohorts/${randomCohort._id}/students`,
      { data: {} }
    );
    expect(responseNoStudents.ok()).not.toBeTruthy();
    // expect(responseNoStudents.status()).toBe(400);
  });
});
