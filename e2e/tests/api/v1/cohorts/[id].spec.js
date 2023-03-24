import { test, expect } from 'e2e/fixtures/testAsAdmin';

test.describe('/api/v1/cohorts/[id]', () => {
  //GET TESTS

  test('returns only not deleted a cohort by id', async ({ request, db }) => {
    const randomNotDeletedCohort = await db.collection('cohorts').findOne({
      deleted_at: { $eq: null },
    });
    //call GET and get the non-deleted cohort by id
    const response = await request.get(
      `/api/v1/cohorts/${randomNotDeletedCohort._id}`
    );

    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if one cohort is returned and it is not deleted
    expect(data).toMatchObject({ deleted_at: null });
    // check if returned data is an object and not an array
    expect(data && typeof data === 'object').toBe(true);
  });

  test('does not return a deleted cohort when supplied with deleted cohort id', async ({
    request,
    db,
  }) => {
    const cohorts = await db.collection('cohorts');
    // find random deleted cohort in db
    const randomDeletedCohort = await cohorts.findOne({
      deleted_at: { $ne: null },
    });

    //call GET and get a cohort by id
    const response = await request.get(
      `/api/v1/cohorts/${randomDeletedCohort._id}`
    );
    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if  returned data is null
    expect(data).toBeNull();
  });
});
