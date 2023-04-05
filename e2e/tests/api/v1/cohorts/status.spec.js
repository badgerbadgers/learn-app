import { test, expect } from 'e2e/fixtures/testAsAdmin';

test.describe('/api/v1/cohorts/status', () => {
  //PATCH TESTS
  test.only("updates all cohorts' status", async ({ request, db }) => {
    // get all cohorts before updating
    const cohorts = await db.collection('cohorts').find().toArray();

    //call PATCH and get all the non-deleted cohorts
    const response = await request.patch(`/api/v1/cohorts/status`);
    expect(response.ok()).toBeTruthy();

    // const cohortsUpdatedCount = (await response.json()).count;
    // find how many cohorts needs an updated (not deleted cohorts)
    const countNotDeletedCohorts = await db
      .collection('cohorts')
      .count({ deleted_at: { $eq: null } });

    // track how many cohorts were updated during the PATCH request
    let updatedCohortCount = 0;
    cohorts.forEach((cohort) => {
      if (!cohort.deleted_at) {
        // test if status of every cohort that needs an update was updated to proper value (all not deleted cohorts)
        expect(cohort.status).toMatch(/^past|future|active|unknown$/);
        updatedCohortCount++;
      }
    });
    expect(countNotDeletedCohorts).toBe(updatedCohortCount);
  });
});
