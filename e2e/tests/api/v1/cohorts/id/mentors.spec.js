import { test, expect } from "e2e/fixtures/testAsAdmin";
const { ObjectId } = require("mongodb");

test.describe("/api/v1/cohorts/[id]/mentors", () => {
  //GET TESTS
  test("returns all mentors of a not deleted cohort by cohort id", async ({
    request,
    db,
  }) => {
    // find a random cohort that has mentors in mentors field
    const randomCohort = await db.collection("cohorts").findOne({
      $and: [
        { deleted_at: { $eq: null } },
        { mentors: { $ne: [] } },
        { mentors: { $ne: null } },
      ],
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
      // expect(mentor).toHaveProperty('added_at'); < ---- only for students
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
      .findOne({ deleted_at: { $eq: null } });

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
      // expect(mentor.user).not.toBeNull(); some of the existing mentors in the current db is null
      // expect(mentor).toHaveProperty('added_at'); <--- only for 'students'
    });

    // check if the request does not add users that do not exist in db, mock data
    const nonExistentUsers = [
      ObjectId("62a8bc08eee42d82d2d8d111"),
      ObjectId("55a5bc08eee42d82d2d8d555"),
    ];

    //call PATCH and get cohort's updated mentors list
    const responseNotAddedMentors = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/mentors`,
      { data: { mentors: nonExistentUsers } }
    );
    // check if response is OK
    expect(responseNotAddedMentors.ok()).toBeTruthy();
    const dataMentorsNotAdded = (await responseNotAddedMentors.json()).data;
    expect(dataMentorsNotAdded.length).toBe(data.length); // compare to the value after the first request which added mentors
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
    //expect(responseNoMentors.status()).toBe(400);
  });
  // DELETE TESTS
  test("deletes mentors from a cohort by cohort's id", async ({
    request,
    db,
  }) => {
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ $where: "this.mentors.length > 1" });

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
