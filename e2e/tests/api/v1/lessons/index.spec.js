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
  /////////////////////////////////////////////////////////////////
  //POST TESTS
  test("creates a lesson when all fields are properly given", async ({
    request,
    db,
  }) => {
    //learning_objectives: in Figma schema is a string in setup/data/lessons.js is an arr of strings
    //order:Lessons parameter in the Course is an array of lesson's ids. Order by default.

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
        "62e26db569dd077fc82fbfdb", //materials_airtableID:"reco3qe9bm6lzhLsP"
        "62e26dbb69dd077fc82fbfe2", //materials_airtableID:"recxcyNX0XTG05Any"
        "62e26dc769dd077fc82fc013", //materials_airtableID:"recIqQx3JL8UmeRpO"
        "62e26dc669dd077fc82fbffd", //materials_airtableID:"recNXVaVwm2OaE0j5"
        "62e26db569dd077fc82fbfdc", //materials_airtableID:"recbSoPGthb0rHbMS"
        "62e26dc769dd077fc82fc015", //materials_airtableID:"recPIg5BTCTvK2n22"
      ],
      assignments: ["62e26dc669dd077fc82fc00d"], //assignments airtableID is "recnkUVqXPiVm1hQ9"
    };

    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newLesson);
    expect(responseData._id).toBeDefined();

    await db
      .collection("lessons")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });
  /////////////////////////////////////////////////////////////////
  test("POST /lesson with empty data ", async ({ request, db }) => {
    //send empty data
    const response = await request.post(`/api/v1/lessons`, {
      data: {},
    });

    // Check that the response is false
    expect(response.ok()).toBeFalsy();
  });

  ////////////////////////////////////////////////////////////////
  test("POST /successfully create a lesson only with title provided", async ({
    request,
    db,
  }) => {
    const newLesson = {
      title: faker.lorem.words(),
    };

    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newLesson);
    expect(responseData._id).toBeDefined();

    await db
      .collection("lessons")
      .deleteOne({ _id: ObjectId(responseData._id) });
  });
});
