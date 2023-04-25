// TODO - which status should be if the schedule is [] ???

import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/cohorts/:id/status", () => {
  //PATCH TESTS
  test("updates cohort's status by id", async ({ request, db }) => {
    // find a random cohort
    const randomCohort = await db.collection("cohorts").findOne({
      deleted_at: { $eq: null },
    });

    //call PATCH and update the cohort's status
    const response = await request.patch(
      `/api/v1/cohorts/${randomCohort._id}/status`
    );
    expect(response.ok()).toBeTruthy();
    const data = (await response.json()).data;

    if (data) {
      //get current date
      const now = new Date(); // .getTime();
      // check if status updated correctly depending on cohort start_date and end_date properties
      if (!randomCohort.start_date) {
        //if no start date, check if status set to "unknown"
        expect(data.status).toBe("unknown");
      } else if (
        !randomCohort.schedule ||
        !Array.isArray(randomCohort.schedule)
      ) {
        // TODO  add !cohort.schedule.length check if added to Cohorts model
        // if no schedule, check if status set to 'unknown'
        expect(data.status).toBe("unknown");
      } else if (now < new Date(randomCohort.start_date).getTime()) {
        //now < randomCohort.start_date
        // if current date is before start date, check if status set to 'future'
        expect(data.status).toBe("future");
      } else if (now > new Date(randomCohort.end_date).getTime()) {
        //if current date is after end date, check if status set to 'past'
        expect(data.status).toBe("past");
      } else {
        //check if status set to 'active' in all other cases
        expect(data.status).toBe("active");
      }
    }
  });
  test("updates cohort's status by id correctly if start_date is not set", async ({
    request,
    db,
  }) => {
    // create a cohort without setting a start date
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      seats: faker.datatype.number({ min: 5, max: 100 }),
      zoom_link: faker.internet.url(),
    };
    const createdCohort = await db.collection("cohorts").insert(newCohort);

    //call PATCH and update the cohort's status
    const responseUpdate = await request.patch(
      `/api/v1/cohorts/${createdCohort.insertedIds[0]}/status`
    );

    expect(responseUpdate.ok()).toBeTruthy();
    const data = (await responseUpdate.json()).data;
    // check if status updated correctly if start_date is null
    expect(data.status).toBe("unknown");
  });

  test("updates cohort's status by id correctly id start_date is in the past", async ({
    request,
    db,
  }) => {
    // create a cohort
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      start_date: faker.date.past(10).toISOString(),
      schedule: [
        {
          type: "lesson",
          lesson: ObjectId("62e26dbb69dd077fc82fbfe1"),
          section: ObjectId("633d9915ec0d4b5e83a6b05e"),
        },
      ],
      seats: faker.datatype.number({ min: 5, max: 100 }),
      zoom_link: faker.internet.url(),
    };
    const createdCohort = await db.collection("cohorts").insert(newCohort);

    //call PATCH and update the cohort's status
    const responseUpdate = await request.patch(
      `/api/v1/cohorts/${createdCohort.insertedIds[0]}/status`
    );
    expect(responseUpdate.ok()).toBeTruthy();
    const data = (await responseUpdate.json()).data;
    if (data) {
      // check if status updated correctly if start_date is in the past
      expect(data.status).toBe("past");
    }
  });

  test("updates cohort's status by id correctly if start_date is in the future", async ({
    request,
    db,
  }) => {
    // create a cohort
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      start_date: faker.date.future(1).toISOString(),
      seats: faker.datatype.number({ min: 5, max: 100 }),
      schedule: [
        {
          type: "lesson",
          lesson: ObjectId("62e26dbb69dd077fc82fbfe1"),
          section: ObjectId("633d9915ec0d4b5e83a6b05e"),
        },
      ],
      zoom_link: faker.internet.url(),
    };

    const createdCohort = await db.collection("cohorts").insert(newCohort);

    //call PATCH and update the cohort's status
    const responseUpdate = await request.patch(
      `/api/v1/cohorts/${createdCohort.insertedIds[0]}/status`
    );

    expect(responseUpdate.ok()).toBeTruthy();
    const data = (await responseUpdate.json()).data;
    // check if status updated correctly if start_date is in the future
    expect(data.status).toBe("future");
  });

  test("updates cohort's status by id correctly if the status is 'active'", async ({
    request,
    db,
  }) => {
    // create a cohort
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      start_date: faker.date.recent(),
      seats: faker.datatype.number({ min: 5, max: 100 }),
      schedule: [
        {
          type: "lesson",
          lesson: ObjectId("62e26dbb69dd077fc82fbfe1"),
          section: ObjectId("633d9915ec0d4b5e83a6b05e"),
        },
        {
          type: "lesson",
          lesson: ObjectId("32e26dbb69dd077fc82fbfe1"),
          section: ObjectId("733d9915ec0d4b5e83a6b05e"),
        },
      ],
      zoom_link: faker.internet.url(),
    };
    const createdCohort = await db.collection("cohorts").insert(newCohort);

    //call PATCH and update the cohort's status
    const response = await request.patch(
      `/api/v1/cohorts/${createdCohort.insertedIds[0]}/status`
    );

    expect(response.ok()).toBeTruthy();
    const data = (await response.json()).data;
    // check if status updated correctly if status should be 'active'
    expect(data.status).toBe("active");
  });

  test("updates cohort's status by id correctly if the schedule is 'null'", async ({
    request,
    db,
  }) => {
    // create a cohort
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      start_date: faker.date.recent(),
      seats: faker.datatype.number({ min: 5, max: 100 }),
      schedule: null,
      zoom_link: faker.internet.url(),
    };
    const createdCohort = await db.collection("cohorts").insert(newCohort);

    //call PATCH and update the cohort's status
    const response = await request.patch(
      `/api/v1/cohorts/${createdCohort.insertedIds[0]}/status`
    );

    expect(response.ok()).toBeTruthy();
    const data = (await response.json()).data;
    // check if status updated correctly if start_date is null
    expect(data.status).toBe("unknown");
  });
});
