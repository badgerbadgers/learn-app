import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/cohorts/id", () => {
  //PATCH TESTS
  //Update name and update slug
  test("change a cohort name and slug", async ({ request, db }) => {
    //call GET and get all the non-deleted cohorts
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();

    // the ID of the cohort Alpaca
    const cohortId = "62db592a4101934c0011b357";
    const newCohortName = faker.lorem.words();
    //change cohort_name and slug
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortId, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ cohort_name: newCohortName }),
    });

    // Check that the PATCH request was successful
    expect(patchResponse.ok()).toBeTruthy();

    // Send a GET request to retrieve the updated list of cohorts
    const updatedResponse = await request.get(`/api/v1/cohorts`);
    const updatedCohorts = (await updatedResponse.json()).data;

    // Check that the cohort name was updated correctly
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortId
    );
    expect(updatedCohort.cohort_name).toBe(newCohortName);
    await db.collection("cohorts");
  });

  ////////////////////////////////////////////////////////////////////////
  //update start date
  test("change start_date", async ({ request, db }) => {
    //call GET and get all the non-deleted cohorts
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();

    // the ID of the cohort Mobile View
    const cohortId = "635841bd9be844015c74719a";
    const newDate = faker.date.future(1).toISOString();
    //change start date
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortId, {
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
      (cohort) => cohort._id === cohortId
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
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();

    // I want to prevent rename Albatross to Mobile View because
    // Mobile View name already exists in cohorts
    const cohortId = "62db592a4101934c0011b356"; //Albatross id
    const originalName = "Albatross";
    const newCohortName = "Mobile View";

    // Send PATCH request to change cohort name
    const patchResponse = await request.patch("/api/v1/cohorts/" + cohortId, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ cohort_name: newCohortName }),
    });

    // Check that the PATCH request was NOT successful
    expect(patchResponse.status()).toBe(400);

    // Verify that cohort name was not changed
    const notUpdatedResponse = await request.get(`/api/v1/cohorts`);
    const notUpdatedCohorts = (await notUpdatedResponse.json()).data;

    // Check that the cohort name was updated correctly
    const notUpdatedCohort = notUpdatedCohorts.find(
      (cohort) => cohort._id === cohortId
    );

    expect(notUpdatedCohort.cohort_name).toBe(originalName); //toEqual

    await db.collection("cohorts");
  });
});
