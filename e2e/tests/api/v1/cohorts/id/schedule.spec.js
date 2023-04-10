//import { test, expect } from "e2e/fixtures/testAsUser"; //test for GET method
import { test, expect } from "e2e/fixtures/testAsAdmin"; //test for PUT method

test.describe("/api/v1/cohorts/[id]/schedule", () => {
  //GET TESTS
  test("returns schedule array of a non deleted cohort by cohort id", async ({
    request,
    db,
  }) => {
    //find not deleted cohort that has NON empty schedule array
    //at this moment only Intro cohorts has schedule array
    const nonEmptyScheduleCohort = await db.collection("cohorts").findOne({
      $and: [
        { deleted_at: { $eq: null } },
        { schedule: { $ne: [] } },
        { schedule: { $ne: null } },
      ],
    });

    //call GET and get the non-deleted cohort by id
    const response = await request.get(
      `/api/v1/cohorts/${nonEmptyScheduleCohort._id}/schedule`
    );

    const data = (await response.json()).data.schedule;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(Array.isArray(data)).toBe(true);
    // check if array of schedule has expected length
    expect(data).toHaveLength(nonEmptyScheduleCohort.schedule.length);

    // check if each element of the array has a property 'type' and 'section'
    data.forEach((schedule) => {
      expect(schedule).toHaveProperty("type");
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
    const responseDeletedCohort = await request.get(
      `/api/v1/cohorts/${randomDeletedCohort._id}/schedule`
    );
    // test if api does not return ok response if cohort is deleted
    expect(responseDeletedCohort.ok()).not.toBeTruthy();
    expect(responseDeletedCohort.status()).toBe(400);
  });

  ////////////////////////////////////////////////////////////////////
  //PUT TESTS
  test("test should update a cohort schedule property with an properly giving array of schedule objects", async ({
    request,
    db,
  }) => {
    //create schedule
    const schedule = {
      schedule: [
        { lesson: "62e26dbb69dd077fc82fbfe5" },
        { lesson: "62e26dbb69dd077fc82fbfe1" },
        { lesson: "62e26dc769dd077fc82fc017" },
        { lesson: "62e26dc669dd077fc82fc00b" },
      ],
    };
    console.log("SCHEDULE", schedule.schedule);
    // update cohort with empty schedule array
    const response = await request.put(
      "api/v1/cohorts/632e0184290d23ac4c005e27/schedule",
      {
        data: schedule,
      }
    );
    console.log("Resp", response);
    // check if response is OK
    expect(response.status()).toBeTruthy();
    const data = (await response.json()).data;
    console.log("DATA", data);

    // Send a GET request to retrieve the updated list of cohorts
    const updatedResponse = await request.get(
      "api/v1/cohorts/632e0184290d23ac4c005e27/schedule"
    );

    const updatedCohort = (await updatedResponse.json()).data.schedule;
    //console.log("UPDATED COHORT's Schedule", updatedCohort);
    //return lesson's ids to match with sended ids
    const result = updatedCohort.map(({ lesson }) => {
      return { lesson: lesson._id };
    });
    console.log("LESSON's ID", result);
    expect(result).toStrictEqual(schedule.schedule);

    expect(result.length).toBe(schedule.schedule.length);

    await db.collection("cohorts");
  });
});
