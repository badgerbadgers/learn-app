import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/cohorts/[id]/schedule", () => {
  //PUT TESTS
  test("test should update a cohort's schedule with properly given data, type and section are required", async ({
    request,
    db,
  }) => {
    //find lessons  from db
    const lessons = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(2)
      .toArray();

    //convert lesson's id and section's id to string type
    const lesson = lessons.map((obj) => obj._id.toString());
    const section = lessons.map((obj) => obj.section.toString());

    //create schedule
    const newSchedule = {
      schedule: [
        {
          type: "lesson",
          lesson: lesson[0],
          section: section[0],
        },
        {
          type: "review",
          content: "Some text",
          section: section[0],
        },
        {
          type: "lesson",
          lesson: lesson[1],
          section: section[0],
        },
        {
          type: "break",
          content: "Some text",
          section: section[0],
        },
      ],
    };

    // find a random non deleted cohort
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
    });

    // update a schedule array of cohort
    const response = await request.put(
      `api/v1/cohorts/${randomCohort._id}/schedule`,
      {
        data: newSchedule,
      }
    );

    // check if response is OK
    expect(response.status()).toBeTruthy();
    const data = (await response.json()).data;
    expect(data && Array.isArray(data)).toBe(true);

    //lesson's Ids after PUT
    const lessonsId = data
      .filter((lesson) => lesson.lesson)
      .map((obj) => obj.lesson._id);

    //section's Ids after PUT
    const sectionsId = data
      .filter((section) => section.section)
      .map((obj) => obj.section._id);

    // Send a GET request to retrieve the updated schedule array of cohort
    const updatedResponse = await request.get(
      `api/v1/cohorts/${randomCohort._id}/schedule`
    );
    // check if response is OK
    expect(updatedResponse.ok()).toBeTruthy();
    const updatedData = (await updatedResponse.json()).data;

    //lesson's Ids after PUT
    const updatedLessonsID = updatedData
      .filter((lesson) => lesson.lesson)
      .map((obj) => obj.lesson._id);

    //section's Ids after PUT
    const updatedSectionsID = updatedData.map((obj) => obj.section._id);

    expect(updatedData.length).toBe(data.length);
    //check if lesson' ids and section's ids are matching
    expect(updatedLessonsID.sort()).toEqual(lessonsId.sort());
    expect(updatedSectionsID.sort()).toEqual(sectionsId.sort());

    expect(updatedLessonsID).toEqual(expect.arrayContaining(lessonsId));
    expect(updatedSectionsID).toEqual(expect.arrayContaining(sectionsId));

    // check if each object in the schedule array has a "type" property
    data.forEach((obj) => expect(obj.hasOwnProperty("type")).toBe(true));
  });

  test("api doesn't update cohort schedule if cohort is deleted", async ({
    request,
    db,
  }) => {
    //find lessons  from db
    const lessons = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(2)
      .toArray();

    //convert lesson's id and section's id to string type
    const lesson = lessons.map((obj) => obj._id.toString());
    const section = lessons.map((obj) => obj.section.toString());

    //create schedule
    const newSchedule = {
      schedule: [
        {
          type: "lesson",
          lesson: lesson[0],
          section: section[0],
        },
        {
          type: "review",
          content: "Some text",
          section: section[0],
        },
        {
          type: "lesson",
          lesson: lesson[1],
          section: section[0],
        },
        {
          type: "break",
          content: "Some text",
          section: section[0],
        },
      ],
    };

    // find deleted cohort
    const randomDeletedCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $ne: null } });

    const responseForDeletedCohort = await request.put(
      `/api/v1/cohorts/${randomDeletedCohort._id}/schedule`,
      {
        data: newSchedule,
      }
    );
    // check if response is not OK
    expect(responseForDeletedCohort.ok()).not.toBeTruthy();
    expect(responseForDeletedCohort.status()).toBe(404);
  });

  test("api doesn't update cohort schedule if schedule data is empty", async ({
    request,
    db,
  }) => {
    // find non deleted cohort
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    //send empty data of schedule to DB
    const responseNoData = await request.put(
      `/api/v1/cohorts/${randomCohort._id}/schedule`,
      { data: {} }
    );
    //check if response wasn't successful
    expect(responseNoData.ok()).not.toBeTruthy();
    expect(responseNoData.status()).toBe(400);
    const responseMessage = (await responseNoData.json()).message;

    //Verify that response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch("Schedule list is not provided");
  });
  test("does not update a schedule when type is missing", async ({
    request,
    db,
  }) => {
    //find lessons  from db
    const lessons = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(2)
      .toArray();

    //convert lesson's id and section's id to string type
    const lesson = lessons.map((obj) => obj._id.toString());
    const section = lessons.map((obj) => obj.section.toString());

    //create schedule
    const newSchedule = {
      schedule: [
        {
          lesson: lesson[0],
          section: section[0],
        },
        {
          type: "review",
          content: "Some text",
          section: section[0],
        },
        {
          type: "lesson",
          lesson: lesson[1],
          section: section[0],
        },
        {
          type: "break",
          content: "Some text",
          section: section[0],
        },
      ],
    };

    // find a random non deleted cohort
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
    });

    // update a schedule array of cohort
    const response = await request.put(
      `api/v1/cohorts/${randomCohort._id}/schedule`,
      {
        data: newSchedule,
      }
    );
    // check if response is not OK
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(400);
  });

  test("does not update a schedule when section is missing", async ({
    request,
    db,
  }) => {
    //find lessons  from db
    const lessons = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(2)
      .toArray();

    //convert lesson's id and section's id to string type
    const lesson = lessons.map((obj) => obj._id.toString());
    const section = lessons.map((obj) => obj.section.toString());

    //create schedule
    const newSchedule = {
      schedule: [
        {
          type: "lesson",
          lesson: lesson[0],
          section: section[0],
        },
        {
          type: "review",
          content: "Some text",
          section: section[0],
        },
        {
          type: "lesson",
          lesson: lesson[1],
        },
        {
          type: "break",
          content: "Some text",
          section: section[0],
        },
      ],
    };

    // find a random non deleted cohort
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
    });

    // update a schedule array of cohort
    const response = await request.put(
      `api/v1/cohorts/${randomCohort._id}/schedule`,
      {
        data: newSchedule,
      }
    );
    // check if response is not OK
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(400);
  });

  test("does not update a schedule when section's ids do not exist in DB", async ({
    request,
    db,
  }) => {
    //find lessons  from db
    const lessons = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(2)
      .toArray();

    //convert lesson's id and section's id to string type
    const lesson = lessons.map((obj) => obj._id.toString());
    const section = lessons.map((obj) => obj.section.toString());

    //create a schedule with non existing section id
    const newSchedule = {
      schedule: [
        {
          type: "lesson",
          lesson: lesson[0],
          section: "933d9917ec0d4b5e83a6b063",
        },
        {
          type: "review",
          content: "Some text",
          section: section[0],
        },
        {
          type: "lesson",
          lesson: lesson[1],
          section: section[0],
        },
        {
          type: "break",
          content: "Some text",
          section: section[0],
        },
      ],
    };

    // find a random non deleted cohort
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
    });

    // update a schedule array of cohort
    const response = await request.put(
      `api/v1/cohorts/${randomCohort._id}/schedule`,
      {
        data: newSchedule,
      }
    );
    // check if response is not OK
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(400);
    const responseMessage = (await response.json()).message;

    //Verify that response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      `Section id provided must exist in the data base`
    );
  });
  test("does not update a schedule when lesson's ids do not exist in DB", async ({
    request,
    db,
  }) => {
    //find lessons  from db
    const lessons = await db
      .collection("lessons")
      .find({}, { projection: { _id: 1, section: 1, type: 1 } })
      .limit(2)
      .toArray();

    //convert lesson's id and section's id to string type
    const lesson = lessons.map((obj) => obj._id.toString());
    const section = lessons.map((obj) => obj.section.toString());

    //create a schedule with non existing lesson id
    const newSchedule = {
      schedule: [
        {
          type: "lesson",
          lesson: lesson[0],
          section: section[0],
        },
        {
          type: "review",
          content: "Some text",
          section: section[0],
        },
        {
          type: "lesson",
          lesson: "72e26dbb69dd077fc82fbfe6",
          section: section[0],
        },
        {
          type: "break",
          content: "Some text",
          section: section[0],
        },
      ],
    };

    // find a random non deleted cohort
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
    });

    // update a schedule array of cohort
    const response = await request.put(
      `api/v1/cohorts/${randomCohort._id}/schedule`,
      {
        data: newSchedule,
      }
    );
    // check if response is not OK
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(400);
    const responseMessage = (await response.json()).message;

    //Verify that response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      `Lesson id provided must exist in the data base`
    );
  });
});
