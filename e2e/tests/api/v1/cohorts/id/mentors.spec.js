import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/cohorts/[id]/mentors", () => {
  //GET TESTS
  test("returns all mentors of a not deleted cohort by cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has mentors in mentors field
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
      mentors: { $nin: [[], null] },
    });

    //call GET and get the non-deleted cohort by id
    const response = await request.get(
      `/api/v1/cohorts/${randomCohort._id}/mentors`
    );

    const data = (await response.json()).data;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(data && Array.isArray(data)).toBe(true);
    // check if array of mentors has expected length
    expect(data).toHaveLength(randomCohort.mentors.length);
    // check if each element of the array has a property 'user' and 'added_at'
    data.forEach((mentor) => {
      expect(mentor).toHaveProperty("user");
    });
  });

  test("returns empty array if cohort has no mentors", async ({
    request,
    db,
  }) => {
    const randomCohortWithNoMentors = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, mentors: { $eq: [] } });

    const responseNoMentors = await request.get(
      `/api/v1/cohorts/${randomCohortWithNoMentors._id}/mentors`
    );
    const noMentorsData = (await responseNoMentors.json()).data;
    // check if response is OK
    expect(responseNoMentors.ok()).toBeTruthy();
    // check an empty array is returned
    expect(noMentorsData).toHaveLength(0);
  });

  test("does not return mentors of a deleted cohort", async ({
    request,
    db,
  }) => {
    const randomDeletedCohort = await db.collection("cohorts").findOne({
      deleted_at: { $ne: null },
    });
    const responseDeletedCohort = await request.get(
      `/api/v1/cohorts/${randomDeletedCohort._id}/mentors`
    );
    // test if api does not return ok response if cohort is deleted
    expect(responseDeletedCohort.ok()).not.toBeTruthy();
    expect(responseDeletedCohort.status()).toBe(404);
  });

  // PATCH TESTS
  test("adds mentors by ids to a cohort by provided cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has mentors in mentors field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, mentors: { $nin: [[], null] } });

    // find users from users db to add to cohort
    const usersToAdd = await db
      .collection("users")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(4)
      .toArray();

    const parsedUsersToAdd = usersToAdd.map((user) => user._id.toString()); // extract ids of the mentors

    // find number of mentors which are already in the cohort
    const duplicateMentorsCount = parsedUsersToAdd.reduce((total, user) => {
      const ifFound = randomCohort.mentors?.find((mentor) => {
        return mentor.user.toString() === user;
      })
        ? 1
        : 0;

      total += ifFound;
      return total;
    }, 0);

    //call PATCH and get cohort's updated mentors list
    const response = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: { mentors: parsedUsersToAdd } }
    );

    const data = (await response.json()).data;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(data && Array.isArray(data)).toBe(true);
    // // check if array of mentors has expected length
    const expectedMentorsCount =
      randomCohort.mentors?.length +
        parsedUsersToAdd.length -
        duplicateMentorsCount || 0;

    expect(data.length).toBe(expectedMentorsCount);
    // check if each element of the data has a property 'user' and 'added_at'
    data.forEach((mentor) => {
      expect(mentor).toHaveProperty("user");
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

  test("does not add duplicated mentors if duplicated mentors are in update object", async ({
    request,
    db,
  }) => {
    // find a random cohort that has mentors in mentors field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, mentors: { $nin: [[], null] } });

    // find users from users db to add to cohort
    const usersToAdd = await db
      .collection("users")
      .find({}, { projection: { _id: 1, name: 1 } }) // return only ids
      .limit(2)
      .toArray();

    const parsedUsersToAdd = usersToAdd.map((user) => user._id.toString()); // extract ids of the mentors
    // extract 2 mentors from the cohort to be updated to create duplicate mentors
    const duplicateMentors = randomCohort.mentors
      .map((mentor) => {
        if (mentor.user) {
          return mentor.user.toString();
        }
      })
      .slice(0, 2); // get 2 mentors

    // call PATCH and get cohort's updated mentors list
    const response = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: { mentors: [...parsedUsersToAdd, ...duplicateMentors] } }
    );

    const data = (await response.json()).data;
    expect(response.ok()).toBeTruthy();
    // check if mentors in updated cohort are not duplicated
    [...parsedUsersToAdd, ...duplicateMentors].forEach((user) => {
      const count = data.filter((mentor) => mentor.user?._id === user).length;
      expect(count).toBe(1);
    });
  });

  test("does not adds non existent mentors to a cohort by provided cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has mentors in mentors field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, mentors: { $nin: [[], null] } });

    // check if the request does not add users that do not exist in db, mock data
    const nonExistentUsers = [
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
    ];

    //call PATCH and get cohort's updated mentors list
    const responseNotAddedMentors = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: { mentors: nonExistentUsers } }
    );
    // check if response is not okay
    expect(responseNotAddedMentors.ok()).toBeFalsy();

    // find the cohort in db after update and make sure the non existed users were not added
    const updatedCohort = await db
      .collection("cohorts")
      .findOne({ _id: randomCohort._id });

    // check if non-existent users were not added to mentors list
    expect(
      updatedCohort.mentors.find(
        (person) =>
          person.user?._id === nonExistentUsers[0] ||
          person.user?._id === nonExistentUsers[1]
      )
    ).toBeFalsy();
  });

  test("does not add users to deleted cohort", async ({ request, db }) => {
    //  check if the request does not add users to deleted cohort
    const randomDeletedCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $ne: null } });

    const responseForDeletedCohort = await request.patch(
      `/api/v1/cohorts/${randomDeletedCohort._id}/mentors`,
      { data: { mentors: [] } }
    );
    // check if response is not OK
    expect(responseForDeletedCohort.ok()).not.toBeTruthy();
    expect(responseForDeletedCohort.status()).toBe(404);
  });

  test("returns error if array of mentors to add not provided", async ({
    request,
    db,
  }) => {
    // find a random cohort that has mentors in mentors field
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    //call PATCH to add mentors of a cohort by id
    const responseNoMentors = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: {} }
    );
    expect(responseNoMentors.ok()).not.toBeTruthy();
    expect(responseNoMentors.status()).toBe(400);
  });
  // DELETE TESTS
  test("deletes mentors from a cohort by cohort's id", async ({
    request,
    db,
  }) => {
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
      $where: "this.mentors.length > 1",
    });

    // filter the array to get mentors with ids
    const parsedUsersToDelete = randomCohort.mentors.reduce(
      (total, { user }) => {
        if (user) {
          total.push(user.toString());
        }
        return total;
      },
      []
    );

    //call DELETE to delete mentors of a cohort by id
    const response = await request.delete(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: { mentors: [parsedUsersToDelete[0]] } } // delete one user
    );

    // check if response is OK
    expect(response.ok()).toBeTruthy();

    // retrieve cohort from db to check if the mentors were deleted
    const updatedCohort1 = await db
      .collection("cohorts")
      .findOne({ _id: randomCohort._id });

    // check if one mentor was deleted
    expect(updatedCohort1.mentors.length).toBe(randomCohort.mentors.length - 1);
    //call DELETE to delete mentors of a cohort by id
    const responseDeleteAll = await request.delete(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: { mentors: parsedUsersToDelete } }
    );
    // check if response is OK
    expect(responseDeleteAll.ok()).toBeTruthy();
    const updatedCohort2 = await db
      .collection("cohorts")
      .findOne({ _id: randomCohort._id });
    // check if all mentors were deleted
    expect(updatedCohort2.mentors.length).toBe(0);
  });
  test("returns error if array of mentors to delete not provided", async ({
    request,
    db,
  }) => {
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ $where: "this.mentors.length > 1" });

    //call DELETE to delete mentors of a cohort by id
    const responseNoMentors = await request.delete(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: {} }
    );
    expect(responseNoMentors.ok()).not.toBeTruthy();
    // expect(responseNoMentors.status()).toBe(400);
  });
});
