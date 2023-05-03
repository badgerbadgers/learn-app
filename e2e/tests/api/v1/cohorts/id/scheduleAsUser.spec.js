import { test, expect } from "e2e/fixtures/testAsUser"; //test for GET method

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

    //call GET and get the non-deleted cohort by id
    const response = await request.get(
      `/api/v1/cohorts/${nonEmptyScheduleCohort._id}/schedule`
    );

    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(Array.isArray(data)).toBe(true);
    // check if array of schedule has expected length
    expect(data).toHaveLength(nonEmptyScheduleCohort.schedule.length);

    // check if each element of the array has a required property "type" and "section"
    data.forEach((obj) => {
      expect(obj).toHaveProperty("type");
      expect(obj).toHaveProperty("section");
      if (obj.type === "lesson") {
        expect(obj).toHaveProperty("lesson");
        expect(obj).not.toHaveProperty("content");
      } else {
        expect(obj).toHaveProperty("content");
        expect(obj).not.toHaveProperty("lesson");
      }
    });
    // Check if the schedule array has an object with property 'lesson' or 'content'
    const lessonOrAnything = data.find((obj) => obj.hasOwnProperty("type"));

    if (lessonOrAnything.type === "lesson") {
      expect(lessonOrAnything).toHaveProperty("lesson");
      expect(lessonOrAnything).not.toHaveProperty("content");
    } else {
      expect(lessonOrAnything).toHaveProperty("content");
      expect(lessonOrAnything).not.toHaveProperty("lesson");
    }
    //find non deleted cohort that has  EMPTY schedule array
    const emptyScheduleCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null }, schedule: { $eq: [] } });

    const responseEmptySchedule = await request.get(
      `/api/v1/cohorts/${emptyScheduleCohort._id}/schedule`
    );
    const emptyScheduleData = (await responseEmptySchedule.json()).data;
    // check if response is OK
    expect(responseEmptySchedule.ok()).toBeTruthy();
    // check an empty array is returned
    expect(emptyScheduleData).toHaveLength(0);
  });

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
    expect(responseDeletedCohort.status()).toBe(404);

    const responseMessage = (await responseDeletedCohort.json()).message;

    //Verify that response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      `Could not find cohort with id - ${randomDeletedCohort._id}`
    );
  });
});
