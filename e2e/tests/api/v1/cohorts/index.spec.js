import { test, expect } from "e2e/fixtures/testAsAdmin";
import { ObjectId } from "mongodb";

test.describe("/api/v1/cohorts", () => {
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

  test.fixme("gracefully handles errors", async ({ request }) => {});
});
