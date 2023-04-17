import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/cohorts/id", () => {
  //PATCH TESTS
  //Update name
  test("change a cohort name", async ({ request, db }) => {
    // find a random cohort
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    const cohortID = randomCohort._id.toString();
    //new name for cohort
    const newCohortName = faker.lorem.words();
    //change cohort_name and slug
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortID, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ cohort_name: newCohortName }),
    });

    // Check that the PATCH request was successful
    expect(patchResponse.ok()).toBeTruthy();

    // Send a GET request to retrieve the updated list of cohorts
    const updatedResponse = await request.get("/api/v1/cohorts/");
    const updatedCohorts = (await updatedResponse.json()).data;

    // Check that the cohort name was updated correctly
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortID
    );
    expect(updatedCohort.cohort_name).toBe(newCohortName);
  });

  ////////////////////////////////////////////////////////////////////////
  //update start date
  test("change start_date", async ({ request, db }) => {
    // find a random cohort
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    const cohortID = randomCohort._id.toString();
    //new date
    const newDate = faker.date.future(1).toISOString();
    //change start date
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortID, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ start_date: newDate }),
    });

    // Check that the PATCH request was successful
    expect(patchResponse.ok()).toBeTruthy();

    // Send a GET request to retrieve the updated list of cohorts
    const updatedResponse = await request.get(`/api/v1/cohorts`);
    const updatedCohorts = (await updatedResponse.json()).data;

    // Check that the start date was updated correctly
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortID
    );
    expect(updatedCohort.start_date).toBe(newDate);
  });

  ////////////////////////////////////////////////////////////////////////
  //Don't update cohort_name if name already in the array of cohorts
  test("Prevent changing cohort name if it already exists", async ({
    request,
    db,
  }) => {
    //call GET and get all the non-deleted cohorts
    const getCohorts = await request.get(`/api/v1/cohorts`);
    expect(getCohorts.ok()).toBeTruthy();

    const notDeletedCohorts = (await getCohorts.json()).data;

    // filter to get all the cohort_names in array of Cohort objects
    const cohortNames = notDeletedCohorts.map((cohort) => cohort.cohort_name);

    // pick a random cohort name
    const randomExistingCohortName =
      cohortNames[Math.floor(Math.random() * cohortNames.length)];

    // find a random cohort that I try to rename to existing cohort_name
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    const cohortID = randomCohort._id.toString();
    const originalName = randomCohort.cohort_name;
    // Send PATCH request to change cohort name
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortID, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ cohort_name: randomExistingCohortName }),
    });

    // Check that the PATCH request was NOT successful
    expect(patchResponse.status()).toBe(400);

    // Verify that cohort name was not changed
    const notUpdatedResponse = await request.get(`/api/v1/cohorts`);
    const notUpdatedCohorts = (await notUpdatedResponse.json()).data;

    const notUpdatedCohort = notUpdatedCohorts.find(
      (cohort) => cohort._id === cohortID
    );

    expect(notUpdatedCohort.cohort_name).toBe(originalName); //toEqual
  });
  ////////////////////////////////////////////////////////////////////////
  test("update allowed fields such as cohort_name, start_date, zoom_link, seats", async ({
    request,
    db,
  }) => {
    // new fields to cohort
    const updates = {
      cohort_name: faker.lorem.words(),
      start_date: faker.date.future(1).toISOString(),
      seats: faker.datatype.number({ min: 5, max: 100 }),
      zoom_link: faker.internet.url(),
    };

    // find a random cohort
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    const cohortID = randomCohort._id.toString();

    //send new fields to a cohort
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortID, {
      data: updates,
    });

    // Check that the PATCH request was successful
    expect(patchResponse.ok()).toBeTruthy();
    const responseData = (await patchResponse.json()).data;

    expect(responseData).toMatchObject(updates);

    // Send a GET request to retrieve the updated list of cohorts
    const updatedResponse = await request.get(`/api/v1/cohorts`);
    const updatedCohorts = (await updatedResponse.json()).data;

    //find updated cohort
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortID
    );

    // Check that the allowed fields were updated correctly
    expect(updatedCohort.cohort_name).toBe(updates.cohort_name);
    expect(updatedCohort.start_date).toBe(updates.start_date);
    expect(updatedCohort.zoom_link).toBe(updates.zoom_link);
    expect(updatedCohort.seats).toBe(updates.seats);
  });

  ////////////////////////////////////////////////////////////////////////
  test("DON't update NOT allowed fields such as slug,course, end_date, status,students,mentors, schedule, created_at", async ({
    request,
    db,
  }) => {
    // new fields to cohort
    const updates = {
      slug: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c511",
      end_date: faker.date.future(1).toISOString(),
      status: faker.lorem.words(),
      students: faker.datatype.number({ min: 5, max: 100 }),
      mentors: faker.datatype.number({ min: 5, max: 100 }),
      schedule: faker.datatype.number({ min: 5, max: 100 }),
      created_at: faker.date.future(1).toISOString(),
    };

    // find a random cohort
    const randomCohort = await db
      .collection("cohorts")
      .findOne({ deleted_at: { $eq: null } });

    const cohortID = randomCohort._id.toString();

    //send new fields to a cohort
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortID, {
      data: updates,
    });

    // Check that the PATCH request was FALSE
    expect(patchResponse.ok()).toBeFalsy();

    // Send a GET request to retrieve list of cohorts
    const updatedResponse = await request.get(`/api/v1/cohorts`);
    const updatedCohorts = (await updatedResponse.json()).data;

    //find cohort that I tried to update
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortID
    );

    // Check that the NOT allowed fields were NOT updated
    expect(updatedCohort.slug).not.toBe(updates.slug);
    expect(updatedCohort.course).not.toBe(updates.course);
    expect(updatedCohort.end_date).not.toBe(updates.end_date);
    expect(updatedCohort.status).not.toBe(updates.status);
    expect(updatedCohort.students).not.toBe(updates.students);
    expect(updatedCohort.mentors).not.toBe(updates.course);
    expect(updatedCohort.schedule).not.toBe(updates.schedule);
    expect(updatedCohort.created_at).not.toBe(updates.created_at);
  });
});
