import { test, expect } from "e2e/fixtures/testAsUser";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

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

  //POST TESTS
  test("creates a lesson when all fields are properly given", async ({
    request,
    db,
  }) => {
    //learning_objectives: in Figma schema is a string in setup/data/lessons.js is an arr of strings
    //order:Lessons parameter in the Course is an array of lesson's ids. Order by default.
    // assignments airtableID and materials airtableID we deal we that later

    const newLesson = {
      title: faker.lorem.words(),
      section: "633d9916ec0d4b5e83a6b061", //id to Sections
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [
        "62e26db569dd077fc82fbfdb",
        "62e26dbb69dd077fc82fbfe2",
        "62e26dc769dd077fc82fc013",
        "62e26dc669dd077fc82fbffd",
        "62e26db569dd077fc82fbfdc",
        "62e26dc769dd077fc82fc015",
      ],
      assignments: ["62e26dc669dd077fc82fc00d"],
      //assignment_airtableID: ["recnkUVqXPiVm1hQ9"],
      // materials_airtableID: [
      //   "recPIg5BTCTvK2n22",
      //   "recNXVaVwm2OaE0j5",
      //   "recbSoPGthb0rHbMS",
      //   "recmb4E1WP5GLQw5c",
      //   "recIqQx3JL8UmeRpO",
      //   "reco3qe9bm6lzhLsP",
      // ],
    };
    console.log("NEW LESSON", newLesson);

    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });
    expect(response.ok()).toBeTruthy();
    console.log("RESP", response);
    const responseData = (await response.json()).data;
    console.log("DATA", responseData);
    expect(responseData).toMatchObject(newLesson);
    expect(responseData._id).toBeDefined();

    await db
      .collection("lessons")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });
});
