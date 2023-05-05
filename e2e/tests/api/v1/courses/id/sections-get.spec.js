import { test, expect } from "e2e/fixtures/testAsUser";
import { faker } from "@faker-js/faker";

test.describe("GET /api/v1/courses/[id]/sections", () => {
  //GET TESTS

  test("returns only not deleted course's sections", async ({
    request,
    db,
  }) => {
    const randomCourse = await db.collection("courses").findOne({
      deleted_at: { $eq: null },
    });

    //call GET and get the course by id
    const response = await request.get(
      `/api/v1/courses/${randomCourse._id}/sections`
    );

    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();

    expect(data && Array.isArray(data)).toBe(true);
    if (data.length) {
      // check if each element of the array has a properties _id, title, course and the course property equals to random course._id
      data.forEach((section) => {
        expect(section._id).toBeDefined();
        expect(section).toHaveProperty("title");
        expect(section).toHaveProperty("course");
        expect(section.course).toBe(randomCourse._id.toString());
        expect(section.deleted_at).toBeNull();
      });
    }
  });

  test("does not return a deleted course's sections", async ({
    request,
    db,
  }) => {
    const randomCourse = await db.collection("courses").findOne({
      deleted_at: { $ne: null },
    });
    //call GET and get the course by id
    const response = await request.get(
      `/api/v1/courses/${randomCourse._id}/sections`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  test("does not return sections for a course with non existent id", async ({
    request,
  }) => {
    const randomNonExistentId = faker.database.mongodbObjectId();
    //call GET and get the course by id
    const response = await request.get(
      `/api/v1/courses/${randomNonExistentId}/sections`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});
