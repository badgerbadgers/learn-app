import { test, expect } from "e2e/fixtures/testAsAdmin";
import { ObjectID } from "mongodb";

test.describe("/api/v1/cohorts", () => {
  test("returns an empty array when there are no cohorts", async ({
    request,
  }) => {
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();
    expect((await response.json()).data).toHaveLength(0);
  });

  test("returns all cohorts", async ({ request, db }) => {
    //populate the database with some cohorts
    const mockCourse = { course_name: "course 1", slug: "course-1" };
    await db.resetData();
    let result = await db.collection("courses").insertOne(mockCourse);
    const courseId = result.insertedId;

    const mockCohorts = [
      {
        cohort_name: "cohort 1",
        slug: "cohort-1",
        start_date: new Date(),
        course: new ObjectID(courseId),
      },
      {
        cohort_name: "cohort 2",
        slug: "cohort-2",
        start_date: new Date(),
        course: new ObjectID(courseId),
      },
      {
        cohort_name: "cohort 3",
        slug: "cohort-3",
        start_date: new Date(),
        course: new ObjectID(courseId),
      },
    ];
    await db.collection("cohorts").insertMany(mockCohorts);

    const mockDeletedCohort = {
      cohort_name: "deleted cohort",
      slug: "deleted-cohort",
      start_date: new Date(),
      course: new ObjectID(courseId),
      deleted_at: new Date(),
    };
    await db.collection("cohorts").insertOne(mockDeletedCohort);

    //call GET and get all the non-deleted cohorts
    const response = await request.get(`/api/v1/cohorts`);
    expect(response.ok()).toBeTruthy();
    const cohorts = (await response.json()).data;
    expect(cohorts).toHaveLength(mockCohorts.length);
    expect(cohorts).toContainEqual(
      expect.objectContaining({ slug: "cohort-3" })
    );
    expect(cohorts).not.toContainEqual(
      expect.objectContaining({ slug: "deleted-cohort" })
    );
  });

  test.fixme("supports filters", async ({ request }) => {});

  test.fixme("gracefully handles errors", async ({ request }) => {});
});
