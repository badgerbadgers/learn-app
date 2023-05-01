import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/cohorts/[id]/schedule", () => {
  //GET TEST is completely the same as in the user test
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

    const data = (await response.json()).data.schedule;

    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if returned data is an array
    expect(Array.isArray(data)).toBe(true);
    // check if array of schedule has expected length
    expect(data).toHaveLength(nonEmptyScheduleCohort.schedule.length);

    // check if each element of the array has a required property "type" and "section"
    data.forEach((schedule) => {
      expect(schedule).toHaveProperty("type");
      expect(schedule).toHaveProperty("section");
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
    const emptyScheduleData = (await responseEmptySchedule.json()).data
      .schedule;

    // check if response is OK
    expect(responseEmptySchedule.ok()).toBeTruthy();
    // check an empty array is returned
    expect(emptyScheduleData).toHaveLength(0);
  });
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
    const data = (await response.json()).data.schedule;
    expect(data && Array.isArray(data)).toBe(true);

    //lesson's Ids after PUT
    const lessonsId = data
      .filter((lesson) => lesson.lesson)
      .map((obj) => obj.lesson);

    //section's Ids after PUT
    const sectionsId = data
      .filter((section) => section.section)
      .map((obj) => obj.section);

    // Send a GET request to retrieve the updated schedule array of cohort
    const updatedResponse = await request.get(
      `api/v1/cohorts/${randomCohort._id}/schedule`
    );
    // check if response is OK
    expect(updatedResponse.ok()).toBeTruthy();
    const updatedData = (await updatedResponse.json()).data.schedule;

    //lesson's Ids after PUT
    const updatedLessonsID = updatedData
      .filter((lesson) => lesson.lesson)
      .map((obj) => obj.lesson)
      .map((obj) => obj._id);

    //section's Ids after PUT
    const updatedSectionsID = updatedData
      .map((obj) => obj.section)
      .map((obj) => obj._id);

    expect(updatedData.length).toBe(data.length);
    //check if lesson' ids and section's ids are matching
    expect(updatedLessonsID).toEqual(lessonsId);
    expect(updatedSectionsID).toEqual(sectionsId);

    expect(updatedLessonsID).toEqual(expect.arrayContaining(lessonsId));
    expect(updatedSectionsID).toEqual(expect.arrayContaining(sectionsId));

    // check if each object in the schedule array has a "type" property
    const hasTypeProp = data.every((obj) => obj.hasOwnProperty("type"));
    expect(hasTypeProp).toBe(true);
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
    expect(responseMessage).toMatch(
      `No valid information was supplied to update the schedule of the cohort`
    );
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
    expect(responseMessage).toMatch(`Section's ID not found`);
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
    expect(responseMessage).toMatch(`Lesson's ID not found`);
  });
});
