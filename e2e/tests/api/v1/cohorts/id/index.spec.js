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
    const data = (await patchResponse.json()).data;

    // Send a GET request to retrieve the updated list of cohorts
    const updatedResponse = await request.get("/api/v1/cohorts/");
    const updatedCohorts = (await updatedResponse.json()).data;

    // Check that the cohort name was updated correctly
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortID
    );
    expect(updatedCohort.cohort_name).toBe(newCohortName);
    await db.collection("cohorts");
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
    await db.collection("cohorts");
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
    const originalName = randomCohort.cohort_name.toString();
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

    await db.collection("cohorts");
  });
});
