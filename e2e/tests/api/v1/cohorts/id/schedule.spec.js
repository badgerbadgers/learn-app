//import { test, expect } from "e2e/fixtures/testAsUser"; //test for GET method
import { test, expect } from "e2e/fixtures/testAsAdmin"; //test for PUT method


test.describe("/api/v1/cohorts/[id]/schedule", () => {
  //GET TESTS
  test("returns schedule array of a non deleted cohort by cohort id", async ({
    request,
    db,
  }) => {
    //find not deleted cohort that has NON empty schedule array
    const nonEmptyScheduleCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
      schedule: { $nin: [[], null] },
    });
    //extract id from  cohort
    const cohortID = nonEmptyScheduleCohort._id;

    //call GET and get the non-deleted cohort by id
    const response = await request.get(`/api/v1/cohorts/${cohortID}/schedule`);

    const data = (await response.json()).data.schedule;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(Array.isArray(data)).toBe(true);
    // check if array of schedule has expected length
    expect(data).toHaveLength(nonEmptyScheduleCohort.schedule.length);

    // check if each element of the array has a property 'section'
    data.forEach((schedule) => {
      expect(schedule).toHaveProperty("section");
    });
    // Check if the schedule array has an object with property 'lesson' or 'content'
    const hasLessonOrContent = data.some(
      (item) => item.hasOwnProperty("lesson") || item.hasOwnProperty("content")
    );
    expect(hasLessonOrContent).toBe(true);
    //find non deleted cohort that has  EMPTY schedule array
    const emptyScheduleCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, schedule: { $eq: [] } });

    const responseEmptySchedule = await request.get(
      `/api/v1/cohorts/${emptyScheduleCohort._id}/schedule`
    );
    const emptyScheduleData = (await responseEmptySchedule.json()).data
      .schedule;

    // check if response is OK
    expect(responseEmptySchedule.ok()).toBeTruthy();
    // check an empty array is returned
    expect(emptyScheduleData).toHaveLength(0);
  });
  ////////////////////////////////////////////////////////////////////
  test("does not return schedule of a deleted cohort", async ({
    request,
    db,
  }) => {
    const randomDeletedCohort = await db.collection("cohorts").findOne({
      deleted_at: { $ne: null },
    });
    //extract id from random cohort
    const cohortID = randomDeletedCohort._id;
    const responseDeletedCohort = await request.get(
      `/api/v1/cohorts/${cohortID}/schedule`
    );
    // test if api does not return ok response if cohort is deleted
    expect(responseDeletedCohort.ok()).not.toBeTruthy();
    expect(responseDeletedCohort.status()).toBe(400);
  });

  ////////////////////////////////////////////////////////////////////
  //PUT TESTS
  test("test should update an empty cohort schedule array property with NOT empty array of schedule objects", async ({
    request,
    db,
  }) => {
    //find schedule arr from db
    const updateSchedule = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(4)
      .toArray();

    //convert lesson's id property to string type
    const lessons = updateSchedule.map(({ _id }) => {
      return { lesson: _id.toString() };
    });

    // find a random cohort that has empty schedule property
    const randomCohortSchedule = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
      schedule: { $nin: [[], null] },
    });
    //extract id from random cohort
    const cohortID = randomCohortSchedule._id;

    // update empty schedule array's cohort with elements
    const response = await request.put(`api/v1/cohorts/${cohortID}/schedule`, {
      data: { schedule: lessons },
    });

    // check if response is OK
    expect(response.status()).toBeTruthy();
    const data = (await response.json()).data;

    // Send a GET request to retrieve the updated schedule array of cohort
    const updatedResponse = await request.get(
      `api/v1/cohorts/${cohortID}/schedule`
    );

    const updatedCohort = (await updatedResponse.json()).data.schedule;
    //return lesson's ids to match with sent ids
    const result = updatedCohort.map(({ lesson }) => {
      return { lesson: lesson._id };
    });
    //check if data matches
    expect(result).toStrictEqual(lessons);
    expect(result).toStrictEqual(data.schedule);
    expect(result.length).toBe(lessons.length);

    await db.collection("cohorts");
  });
  test("api doesn't update cohort schedule if cohort is deleted", async ({
    request,
    db,
  }) => {
    //find schedule arr from db
    const updateSchedule = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(4)
      .toArray();

    //convert lesson's id property to string type
    const lessons = updateSchedule.map(({ _id }) => {
      return { lesson: _id.toString() };
    });
    // find deleted cohort
    const randomDeletedCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $ne: null } });
    //extract id from random cohort
    const cohortID = randomDeletedCohort._id;

    const responseForDeletedCohort = await request.put(
      `/api/v1/cohorts/${cohortID}/schedule`,
      { data: { schedule: lessons } }
    );
    // check if response is not OK
    expect(responseForDeletedCohort.ok()).not.toBeTruthy();
    expect(responseForDeletedCohort.status()).toBe(400);
  });

  test("api doesn't update cohort schedule if schedule data is empty", async ({
    request,
    db,
  }) => {
    // find non deleted cohort
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });
    //extract id from random cohort
    const cohortID = randomCohort._id;
    //send empty data of schedule to DB
    const responseNoData = await request.put(
      `/api/v1/cohorts/${cohortID}/schedule`,
      { data: {} }
    );
    //check if response wasn't successful
    expect(responseNoData.ok()).not.toBeTruthy();
    expect(responseNoData.status()).toBe(400);
  });

});
