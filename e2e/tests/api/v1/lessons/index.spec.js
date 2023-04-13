import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/lessons", () => {
  //GET TESTS

  test("returns all lessons", async ({ request }) => {
    //call GET and get all the  lessons
    const response = await request.get(`/api/v1/lessons`);
    expect(response.ok()).toBeTruthy();
    const lessons = (await response.json()).data;

    // Check that the response is an array
    expect(Array.isArray(lessons)).toBeTruthy();

    // Check that each lesson object has the expected properties
    lessons.forEach((lesson) => {
      expect(lesson).toHaveProperty("_id");
      expect(lesson).toHaveProperty("lesson_label");
      expect(lesson).toHaveProperty("submission_link");
      expect(lesson).toHaveProperty("title");
      expect(lesson).toHaveProperty("section");
    });
  });

});
