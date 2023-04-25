import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/cohorts", () => {
  //GET TESTS

  test("returns all cohorts", async ({ request, db }) => {
    //populate the database with some cohorts

    //call GET and get all the non-deleted cohorts
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();

    const cohorts = (await response.json()).data;
    // expect(cohorts).toHaveLength(mockCohorts.length);

    //check that all cohorts don't have a deleted_at set
    for (const c of cohorts) {
      expect(c).toMatchObject({ deleted_at: null });
    }

    //check that we get cohorts in all statuses
    expect(cohorts).toContainEqual(expect.objectContaining({ status: "past" }));
    expect(cohorts).toContainEqual(
      expect.objectContaining({ status: "future" })
    );
    expect(cohorts).toContainEqual(
      expect.objectContaining({ status: "active" })
    );
  });

  test("supports deleted filter", async ({ request }) => {
    const response = await request.get("/api/v1/cohorts", {
      params: {
        deleted: true,
      },
    });
    expect(response.ok()).toBeTruthy();

    const cohorts = (await response.json()).data;

    for (const c of cohorts) {
      expect(c.deleted_at).not.toBeNull();
    }
  });

  test("supports status filter", async ({ request }) => {
    const response = await request.get("/api/v1/cohorts", {
      params: {
        status: "active",
      },
    });
    expect(response.ok()).toBeTruthy();

    const cohorts = (await response.json()).data;

    for (const c of cohorts) {
      expect(c.status).toBe("active");
    }
  });

  test("supports course filter", async ({ request }) => {
    const response = await request.get("/api/v1/cohorts", {
      params: {
        course: "62e056cee6daad619e5cc2c5",
      },
    });
    expect(response.ok()).toBeTruthy();

    const cohorts = (await response.json()).data;

    for (const c of cohorts) {
      expect(c.course._id).toBe("62e056cee6daad619e5cc2c5");
    }
  });

  test("returns an empty array when there are no results", async ({
    request,
  }) => {
    const response = await request.get(`/api/v1/cohorts`, {
      params: {
        course: "nosuchcourse",
      },
    });
    expect(response.ok()).toBeTruthy();
    expect((await response.json()).data).toHaveLength(0);
  });

  //POST TESTS
  test("creates a cohort when all fields are properly given", async ({
    request,
    db,
  }) => {
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
    };

    const response = await request.post(`/api/v1/cohorts`, {
      data: newCohort,
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newCohort);

    expect(responseData._id).toBeDefined();

    expect(responseData.schedule).toBeDefined();
    expect(responseData.schedule.length).toBeGreaterThan(0);
    //TODO: improve test to confirm schedule is the same as the course schedule

    expect(responseData.slug).toBeDefined();
    expect(typeof responseData.slug).toBe("string");

    await db
      .collection("cohorts")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });

  test("does not create a cohort when cohort_name is missing", async ({
    request,
  }) => {
    const newCohort = {
      course: "62e056cee6daad619e5cc2c5",
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
    };

    const response = await request.post(`/api/v1/cohorts`, {
      data: newCohort,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our cohort has not been created
    const getResponse = await request.get(`/api/v1/cohorts`);
    expect(getResponse.ok()).toBeTruthy();

    const cohorts = (await getResponse.json()).data;
    expect(cohorts).not.toContainEqual(
      expect.objectContaining({ start_date: newCohort.start_date })
    );
  });

  test("does not create a cohort when course is missing", async ({
    request,
  }) => {
    const newCohort = {
      cohort_name: faker.lorem.words(),
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
    };

    const response = await request.post(`/api/v1/cohorts`, {
      data: newCohort,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our cohort has not been created
    const getResponse = await request.get(`/api/v1/cohorts`);
    expect(getResponse.ok()).toBeTruthy();

    const cohorts = (await getResponse.json()).data;
    expect(cohorts).not.toContainEqual(
      expect.objectContaining({ cohort_name: newCohort.cohort_name })
    );
  });


  test("does not save into the database extra fields that are sent", async ({
    request,
    db,
  }) => {
    // Generate a new cohort object with an extra field
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c5",
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
      extra_field: "This field should not be saved",
    };
    // Send the cohort object to the API endpoint using POST method
    const response = await request.post(`/api/v1/cohorts`, {
      data: newCohort,
    });
    // Check that the response status code is 200 OK
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    // Check that the cohort object in the response body does not contain the extra_field property
    expect(responseData).not.toHaveProperty("extra_field");

    expect(responseData._id).toBeDefined();

    expect(responseData.schedule).toBeDefined();
    expect(responseData.schedule.length).toBeGreaterThan(0);

    expect(responseData.slug).toBeDefined();
    expect(typeof responseData.slug).toBe("string");

    await db
      .collection("cohorts")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });

  test("does not allow creating a cohort with a non-unique name", async ({
    request,
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

    //Cohort with existing name
    const newCohort = {
      cohort_name: randomExistingCohortName,
      course: "62e056cee6daad619e5cc2c5",
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
    };

    // Send POST request to create cohort with non unique name
    const response = await request.post("/api/v1/cohorts", {
      data: newCohort,
    });
    // Check that the POST request was NOT successful
    expect(response.ok()).toBeFalsy();

    const getResponse = await request.get(`/api/v1/cohorts`);
    expect(getResponse.ok()).toBeTruthy();
    // Check that the array of cohorts don't contain newCohort
    const cohorts = (await getResponse.json()).data;
    expect(cohorts).not.toContainEqual(
      expect.objectContaining({ start_date: newCohort.start_date })
    );
  });

  test("handles well the case where a non-existing course id is given", async ({
    request,
  }) => {
    //creates a cohort where a non-existing course id is given
    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: "62e056cee6daad619e5cc2c8",
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
    };
    // Send POST request to create cohort with non-existing course id
    const response = await request.post("/api/v1/cohorts", {
      data: newCohort,
    });

    // Verify that the response is falsy
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);

    // Verify that the response body contains an error message
    const json = await response.json();
    expect(json).toEqual({ message: "Can't fetch lessons from course" });
  });
  //////////////////////////////////////////////////////////////////
  test("create a new cohort when existing course_id is given", async ({
    request,
    db,
  }) => {
    const existingCourseIds = [
      "62e056cee6daad619e5cc2c5",
      "62e056cee6daad619e5cc2c3",
      "62e056cee6daad619e5cc2c4",
    ];
    // Pick a random existing course_id
    const randomCourse =
      existingCourseIds[Math.floor(Math.random() * existingCourseIds.length)];

    const newCohort = {
      cohort_name: faker.lorem.words(),
      course: randomCourse,
      seats: faker.datatype.number({ min: 5, max: 100 }),
      start_date: faker.date.future(1).toISOString(),
      zoom_link: faker.internet.url(),
    };

    const response = await request.post(`/api/v1/cohorts`, {
      data: newCohort,
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newCohort);

    expect(responseData._id).toBeDefined();

    expect(responseData.schedule).toBeDefined();

    expect(responseData.slug).toBeDefined();
    expect(typeof responseData.slug).toBe("string");

    await db
      .collection("cohorts")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });
});
