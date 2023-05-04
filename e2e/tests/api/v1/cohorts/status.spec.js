import { test, expect } from "e2e/fixtures/testAsGuest";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/cohorts/status", () => {
  //PATCH TESTS
  test("returns correct status of all not deleted cohorts", async ({
    request,
    db,
  }) => {
    //call PATCH to update all non-deleted cohorts's status
    const response = await request.patch(`/api/v1/cohorts/status`);
    expect(response.ok()).toBeTruthy();
    // get cohorts after update
    const cohorts = await db.collection("cohorts").find().toArray();

    // track how many cohorts were updated during the PATCH request
    let updatedCohortCount = 0;
    cohorts.forEach((cohort) => {
      if (cohort.deleted_at) {
        return;
      }
      if (!cohort.deleted_at) {
        // test if status of every cohort that needs an update was updated to proper value (all not deleted cohorts)
        expect(cohort.status).toMatch(/^past|future|active|unknown$/);

        //get current date
        const now = new Date().getTime();
        // check if every cohort has correct status depending on cohort start_date, end_date or absence of schedule
        if (!cohort.start_date) {
          //if no start date, check if status set to "unknown"
          expect(cohort.status).toBe("unknown");
        } else if (
          !cohort.schedule ||
          !Array.isArray(cohort.schedule) ||
          !cohort.schedule.length
        ) {
          // if no schedule, check if status set to 'unknown'
          expect(cohort.status).toBe("unknown");
        } else if (now < new Date(cohort.start_date).getTime()) {
          // if current date is before start date, check if status set to 'future'
          expect(cohort.status).toBe("future");
        } else if (now > new Date(cohort.end_date).getTime()) {
          //if current date is after end date, check if status set to 'past'
          expect(cohort.status).toBe("past");
        } else {
          //check if status set to 'active' in all other cases
          expect(cohort.status).toBe("active");
        }
        updatedCohortCount++;
      }
    });
    // find how many cohorts needs an updated (not deleted cohorts)
    const countCohortsToBeUpdated = await db
      .collection("cohorts")
      .count({ deleted_at: { $eq: null } });

    // check if the count of cohorts that had to be updated is the same as the count of actually updated cohorts
    expect(countCohortsToBeUpdated).toBe(updatedCohortCount);
  });

  test("updates cohort's with no schedule with incorrect status to correct one", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const cohort = {
      cohort_name: faker.lorem.words(),
      course: randomCourse._id,
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
      status: "future",
    };

    // create a new cohort in db
    const cohortCreated = await db.collection("cohorts").insertOne(cohort);

    //call PATCH and update all cohorts' status
    const response = await request.patch(`/api/v1/cohorts/status`);
    expect(response.ok()).toBeTruthy();
    // get cohorts after update
    const cohortUpdated = await db
      .collection("cohorts")
      .findOne({ _id: cohortCreated.insertedId });

    expect(cohortUpdated.status).toBe("unknown");
  });
  test("updates cohort's with incorrect status 'future' to correct one 'past'", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });
    const randomSection = await db
      .collection("sections")
      .findOne({ deleted_at: { $eq: null } });

    const cohort = {
      cohort_name: faker.lorem.words(),
      course: randomCourse._id,
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.past(1).toISOString(),
      zoom_link: faker.internet.url(),
      schedule: [
        {
          type: "lesson",
          lesson: randomLesson._id,
          section: randomSection._id,
        },
      ],
      status: "future",
    };

    // create a new cohort in db
    const cohortCreated = await db.collection("cohorts").insertOne(cohort);

    //call PATCH and update all cohorts' status
    const response = await request.patch(`/api/v1/cohorts/status`);
    expect(response.ok()).toBeTruthy();
    // get cohorts after update
    const cohortUpdated = await db
      .collection("cohorts")
      .findOne({ _id: cohortCreated.insertedId });

    expect(cohortUpdated.status).toBe("past");
  });

  test("updates cohort's with incorrect status 'unknown' to correct one 'future'", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });
    const randomSection = await db
      .collection("sections")
      .findOne({ deleted_at: { $eq: null } });
    const cohort = {
      cohort_name: faker.lorem.words(),
      course: randomCourse._id,
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
      schedule: [
        {
          type: "lesson",
          lesson: randomLesson._id,
          section: randomSection._id,
        },
      ],
      status: "unknown",
    };

    // create a new cohort in db
    const cohortCreated = await db.collection("cohorts").insertOne(cohort);

    //call PATCH and update all cohorts' status
    const response = await request.patch(`/api/v1/cohorts/status`);
    expect(response.ok()).toBeTruthy();
    // get cohorts after update
    const cohortUpdated = await db
      .collection("cohorts")
      .findOne({ _id: cohortCreated.insertedId });

    expect(cohortUpdated.status).toBe("future");
  });
});
