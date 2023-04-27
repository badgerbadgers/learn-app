import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/cohorts/[id]/schedule", () => {
  //GET TESTS

  ////////////////////////////////////////////////////////////////////
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
});
