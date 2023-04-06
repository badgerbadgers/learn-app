import { test, expect } from 'e2e/fixtures/testAsAdmin';

test.describe('/api/v1/cohorts/status', () => {
  //PATCH TESTS
  test("updates all cohorts' status", async ({ request, db }) => {
    //call PATCH and get all the non-deleted cohorts
    const response = await request.patch(`/api/v1/cohorts/status`);
    expect(response.ok()).toBeTruthy();
    // get cohorts after update
    const cohorts = await db.collection('cohorts').find().toArray();

    // track how many cohorts were updated during the PATCH request
    let updatedCohortCount = 0;
    cohorts.forEach((cohort) => {
      if (!cohort.deleted_at) {
        // test if status of every cohort that needs an update was updated to proper value (all not deleted cohorts)
        expect(cohort.status).toMatch(/^past|future|active|unknown$/);
        updatedCohortCount++;

        //get current date
        const now = new Date().getTime();
        // check if status updated correctly depending on cohort start_date and end_date properties
        if (!cohort.start_date) {
          //if no start date, check if status set to "unknown"
          expect(cohort.status).toBe('unknown');
        } else if (!cohort.schedule || !Array.isArray(cohort.schedule)) {
          // TODO  add !cohort.schedule.length check if added to Cohorts model
          // if no schedule, check if status set to 'unknown'
          expect(cohort.status).toBe('unknown');
        } else if (now < new Date(cohort.start_date).getTime()) {
          // if current date is before start date, check if status set to 'future'
          expect(cohort.status).toBe('future');
        } else if (now > new Date(cohort.end_date).getTime()) {
          //if current date is after end date, check if status set to 'past'
          expect(cohort.status).toBe('past');
        } else {
          //check if status set to 'active' in all other cases
          expect(cohort.status).toBe('active');
        }
      }
    });
    // find how many cohorts needs an updated (not deleted cohorts)
    const countNotDeletedCohorts = await db
      .collection('cohorts')
      .count({ deleted_at: { $eq: null } });
    // check if the count of cohorts that had to be updated is the same as the count of actually updated cohorts
    expect(countNotDeletedCohorts).toBe(updatedCohortCount);
  });
});
