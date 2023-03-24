// import { test, expect } from 'e2e/fixtures/testAsAdmin';
// import { faker } from '@faker-js/faker';
// import { ObjectId } from 'bson';

// test.describe('/api/v1/cohorts/[id]', () => {
//   //GET TESTS

//   test('returns a cohort by id', async ({ request, db }) => {
//     //call GET and get the non-deleted cohort by id
//     const response = await request.get(`/api/v1/cohorts`);
//     console.log(response);
//     expect(response.ok()).toBeTruthy();

//     const cohorts = (await response.json()).data;
//     // expect(cohorts).toHaveLength(mockCohorts.length);

//     //check that all cohorts don't have a deleted_at set
//     // for (const c of cohorts) {
//     //   expect(c).toMatchObject({ deleted_at: null });
//     // }

//     //check that we get cohorts in all statuses
//     // expect(cohorts).toContainEqual(expect.objectContaining({ status: 'past' }));
//     // expect(cohorts).toContainEqual(
//     //   expect.objectContaining({ status: 'future' })
//     // );
//     // expect(cohorts).toContainEqual(
//     //   expect.objectContaining({ status: 'active' })
//     // );
//   });

//   test.skip('supports deleted filter', async ({ request }) => {
//     const response = await request.get('/api/v1/cohorts', {
//       params: {
//         deleted: true,
//       },
//     });
//     expect(response.ok()).toBeTruthy();

//     const cohorts = (await response.json()).data;

//     for (const c of cohorts) {
//       expect(c.deleted_at).not.toBeNull();
//     }
//   });

//   test.skip('returns an empty array when there are no results', async ({
//     request,
//   }) => {
//     const response = await request.get(`/api/v1/cohorts`, {
//       params: {
//         course: 'nosuchcourse',
//       },
//     });
//     expect(response.ok()).toBeTruthy();
//     expect((await response.json()).data).toHaveLength(0);
//   });
// });
