import { test, expect } from "e2e/fixtures/testAsAdmin";
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
      expect(lesson).toHaveProperty("title");
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
    const randomLesson = await db.collection("lessons").findOne({});

    const newLesson = {
      title: faker.lorem.words(),
      section: randomLesson.section,
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: randomLesson.materials,
      assignments: randomLesson.assignments, //assignments airtableID is "recnkUVqXPiVm1hQ9"
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
  test("does not create a lesson when title is missing", async ({
    request,
    db,
  }) => {
    const randomLesson = await db.collection("lessons").findOne({});

    const newLesson = {
      section: randomLesson.section,
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: randomLesson.materials,
      assignments: randomLesson.assignments,
    };
    //send lesson without title
    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });

    // Check that the response is false
    expect(response.ok()).toBeFalsy();
    //confirm our lesson has not been created
    const getResponse = await request.get(`/api/v1/lessons`);
    expect(getResponse.ok()).toBeTruthy();

    const lessons = (await getResponse.json()).data;
    expect(lessons).not.toContainEqual(
      expect.objectContaining({
        submission_link: newLesson.submission_link.url,
      })
    );
  });
  /////////////////////////////////////////////////////////////////
  test("POST /lesson with empty data ", async ({ request, db }) => {
    //send empty data
    const response = await request.post(`/api/v1/lessons`, {
      data: {},
    });

    // Check that the response is false
    expect(response.ok()).toBeFalsy();
    const responseMessage = (await response.json()).message;

    //Verify that POST response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      "Valid data to create a new lesson not provided"
    );
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
