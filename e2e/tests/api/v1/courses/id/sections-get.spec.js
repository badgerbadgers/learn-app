// import { test, expect } from "e2e/fixtures/testAsUser";
// import { faker } from "@faker-js/faker";

// test.describe("GET /api/v1/courses/[id]/lessons", () => {
//   //GET TESTS

//   test("returns only not deleted a course's lessons", async ({
//     request,
//     db,
//   }) => {
//     const randomCourse = await db.collection("courses").findOne({
//       deleted_at: { $eq: null },
//     });

//     //call GET and get the course by id
//     const response = await request.get(
//       `/api/v1/courses/${randomCourse._id}/lessons`
//     );

//     const data = (await response.json()).data;
//     // check if response is OK
//     expect(response.ok()).toBeTruthy();

//     expect(data && Array.isArray(data)).toBe(true);
//     expect(data).toHaveLength(randomCourse.lessons.length);
//     // check if each element of the array has a property '_id'
//     // TODO - add all required properties for Lesson data model
//     data.forEach((lesson) => {
//       expect(lesson).toHaveProperty("_id");
//       expect(lesson).toHaveProperty("title");
//     });
//   });

//   test("does not return a deleted course's lessons", async ({
//     request,
//     db,
//   }) => {
//     const randomCourse = await db.collection("courses").findOne({
//       deleted_at: { $ne: null },
//     });
//     //call GET and get the course by id
//     const response = await request.get(
//       `/api/v1/courses/${randomCourse._id}/lessons`
//     );
//     expect(response.ok()).toBeFalsy();
//     expect(response.status()).toBe(404);
//   });

//   test("does not return lessons for a course with non existent id", async ({
//     request,
//   }) => {
//     const randomNonExistentId = faker.database.mongodbObjectId();
//     //call GET and get the course by id
//     const response = await request.get(
//       `/api/v1/courses/${randomNonExistentId}/lessons`
//     );
//     expect(response.ok()).toBeFalsy();
//     expect(response.status()).toBe(404);
//   });