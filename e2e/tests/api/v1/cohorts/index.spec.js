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

  test.fixme(
    "does not save into the database extra fields that are sent",
    async ({ request }) => {}
  );

  test.fixme(
    "does not allow creating a cohort with a non-unique name",
    async ({ request }) => {}
  );

  test.fixme(
    "handles well the case where a non-existing course id is given",
    async ({ request }) => {}
  );
});