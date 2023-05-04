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
  // helper function to get existing fields for creating a lesson
  const getRandomDocument = async (db, collection) => {
    const field = await db
      .collection(collection)
      .findOne(
        { deleted_at: { $eq: null } },
        { projection: { _id: 1, name: 1 } }
      );
    return field._id;
  };
  //POST TESTS
  test("creates a lesson when all fields are properly given", async ({
    request,
    db,
  }) => {
    //learning_objectives: in Figma schema is a string in setup/data/lessons.js is an arr of strings
    //order:Lessons parameter in the Course is an array of lesson's ids. Order by default.

    const newLesson = {
      title: faker.lorem.words(),
      section: await getRandomDocument(db, "sections"),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [await getRandomDocument(db, "materials")],
      assignments: [await getRandomDocument(db, "assignments")],
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
    const newLesson = {
      section: await getRandomDocument(db, "sections"),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [await getRandomDocument(db, "materials")],
      assignments: [await getRandomDocument(db, "assignments")],
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
  test("does not create a lesson when section id does not exist in DB", async ({
    request,
    db,
  }) => {
    const newLesson = {
      title: faker.lorem.words(),
      section: faker.database.mongodbObjectId(),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [await getRandomDocument(db, "materials")],
      assignments: [await getRandomDocument(db, "assignments")],
    };
    //send lesson without title
    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });

    // Check that the response is false
    expect(response.ok()).toBeFalsy();
    const responseMessage = (await response.json()).message;

    //Verify that POST response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      "Section id provided must be unique and exist in the data base"
    );
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
  test("does not create a lesson when material id does not exist in DB", async ({
    request,
    db,
  }) => {
    const newLesson = {
      title: faker.lorem.words(),
      section: await getRandomDocument(db, "sections"),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [faker.database.mongodbObjectId()],
      assignments: [await getRandomDocument(db, "assignments")],
    };
    //send lesson without title
    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });

    // Check that the response is false
    expect(response.ok()).toBeFalsy();
    const responseMessage = (await response.json()).message;

    //Verify that POST response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      "All materials ids provided must be unique and exist in the data base"
    );
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
  test("does not create a lesson when assignment id does not exist in DB", async ({
    request,
    db,
  }) => {
    const newLesson = {
      title: faker.lorem.words(),
      section: await getRandomDocument(db, "sections"),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [await getRandomDocument(db, "materials")],
      assignments: [faker.database.mongodbObjectId()],
    };
    //send lesson without title
    const response = await request.post(`/api/v1/lessons`, {
      data: newLesson,
    });

    // Check that the response is false
    expect(response.ok()).toBeFalsy();
    const responseMessage = (await response.json()).message;

    //Verify that POST response returning error message
    expect(responseMessage).toEqual(expect.any(String));
    expect(responseMessage).toMatch(
      "All assignments ids provided must be unique and exist in the data base"
    );
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
});
