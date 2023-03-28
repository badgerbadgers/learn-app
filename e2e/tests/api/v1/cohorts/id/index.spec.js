import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/cohorts/id", () => {
  //PATCH TESTS
  //TODO:
  //Find out cohort id
  //Update name
  //update slug
  //update start date
  //update schedule ?

  test("change a cohort name and slug", async ({ request, db }) => {
    //call GET and get all the non-deleted cohorts
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();

    const cohorts = (await response.json()).data;
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

  test("change start_date", async ({ request, db }) => {
    //call GET and get all the non-deleted cohorts
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();

    const cohorts = (await response.json()).data;
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

    // Check that the cohort name was updated correctly
    const updatedCohort = updatedCohorts.find(
      (cohort) => cohort._id === cohortId
    );
    expect(updatedCohort.start_date).toBe(newDate);
    await db.collection("cohorts");
  });
});
