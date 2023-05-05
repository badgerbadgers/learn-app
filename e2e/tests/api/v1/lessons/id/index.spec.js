import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/lessons/[id]", () => {
  //GET TESTS

  test("returns only not deleted lesson by id", async ({ request, db }) => {
    const randomLesson = await db.collection("lessons").findOne({
      deleted_at: { $eq: null },
    });
    //call GET and get the lesson by id
    const response = await request.get(`/api/v1/lessons/${randomLesson._id}`);

    const data = (await response.json()).data;
    // check if response is OK
    expect(response.ok()).toBeTruthy();
    // check if one lesson is returned and it is not deleted
    expect(data).toMatchObject({ deleted_at: null });
    expect(data).toMatchObject(randomLesson);
    expect(data.title).toBeDefined();
    expect(data._id).toBeDefined();
  });

  test("does not return a deleted lesson", async ({ request, db }) => {
    const randomLesson = await db.collection("lessons").findOne({
      deleted_at: { $ne: null },
    });
    //call GET and get the lesson by id
    const response = await request.get(`/api/v1/lessons/${randomLesson._id}`);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  test("does not return a lesson with non existent id", async ({ request }) => {
    const randomNonExistentId = faker.database.mongodbObjectId();
    //call GET and get the lesson by id
    const response = await request.get(
      `/api/v1/lessons/${randomNonExistentId}`
    );
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  // helper function to get fields for updating lessons
  const getRandomField = async (db, collection) => {
    const field = await db
      .collection(collection)
      .findOne(
        { deleted_at: { $eq: null } },
        { projection: { _id: 1, name: 1 } }
      );
    return field._id;
  };

  // PATCH tests
  test("updates a lesson when all fields are properly given", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 1, max: 100 }),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
      learning_objectives: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
      materials: [await getRandomField(db, "materials")],
      assignments: [await getRandomField(db, "assignments")],
      section: await getRandomField(db, "sections"),
    };

    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;

    expect(responseData._id).toBe(randomLesson._id.toString());
    expect(responseData.title).toBe(updates.title);
    expect(responseData.order).toBe(updates.order);

    expect(responseData.submission_link).toMatchObject(updates.submission_link);
    expect(responseData.learning_objectives).toMatchObject(
      updates.learning_objectives
    );
    expect(responseData.mindset_content).toBe(updates.mindset_content);

    expect(responseData.materials[0]._id).toBe(updates.materials[0].toString());
    expect(responseData.assignments[0]._id).toBe(
      updates.assignments[0].toString()
    );
    expect(responseData.section._id).toBe(updates.section.toString());
  });

  test("does not add non existed fields when updating lessons", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      title: faker.lorem.words(),
      fake_title: faker.lorem.words(),

      goals: [faker.lorem.words(), faker.lorem.words()],
      mindset_content: faker.lorem.words(),
    };
    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeTruthy();

    const updatedLesson = (await response.json()).data;
    expect(updatedLesson.title).toBe(updates.title);
    expect(updatedLesson.goals).toBeUndefined();
    expect(updatedLesson.fake_name).toBeUndefined();
    const lessonWithNotValidFields = await db
      .collection("lessons")
      .findOne({ fake_title: updates.title, goals: updates.goals });
    expect(lessonWithNotValidFields).toBeNull();
  });

  test("does not update a lesson  if not all materials ids exist in db", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const nonExistentMaterial = faker.database.mongodbObjectId();
    const updates = {
      title: faker.lorem.words(),
      materials: [nonExistentMaterial, await getRandomField(db, "materials")],
    };

    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    //confirm the lesson  was not updated
    const getResponse = await request.get(
      `/api/v1/lessons/${randomLesson._id}`
    );
    expect(getResponse.ok()).toBeTruthy();

    const lesson = (await getResponse.json()).data;
    // using sort() to make sure array compared correctly if different order of elements provided
    expect(lesson.materials.sort()).not.toStrictEqual(updates.materials.sort());
  });

  test("does not update a lesson  if not all assignments ids exist in db", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const nonExistentAssignment = faker.database.mongodbObjectId();
    const updates = {
      title: faker.lorem.words(),
      assignments: [
        nonExistentAssignment,
        await getRandomField(db, "assignments"),
      ],
    };

    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    //confirm the lesson  was not updated
    const getResponse = await request.get(
      `/api/v1/lessons/${randomLesson._id}`
    );
    expect(getResponse.ok()).toBeTruthy();

    const lesson = (await getResponse.json()).data;
    // using sort() to make sure array compared correctly if different order of elements provided
    expect(lesson.assignments.sort()).not.toStrictEqual(
      updates.assignments.sort()
    );
  });

  test("does not update a lesson  if section id does not exist in db", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const nonExistentSection = faker.database.mongodbObjectId();
    const updates = {
      title: faker.lorem.words(),
      section: nonExistentSection,
    };

    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    //confirm the lesson  was not updated
    const getResponse = await request.get(
      `/api/v1/lessons/${randomLesson._id}`
    );
    expect(getResponse.ok()).toBeTruthy();

    const lesson = (await getResponse.json()).data;
    // using sort() to make sure array compared correctly if different order of elements provided
    expect(lesson.section).not.toBe(nonExistentSection);
  });

  test("does not update lesson if provided in update object 'submission_link' missing url and returns error", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      title: faker.lorem.words(),
      submission_link: { label: faker.lorem.words() },
    };
    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    const lessonNotUpdated = await db
      .collection("lessons")
      .findOne({ _id: randomLesson._id });

    expect(lessonNotUpdated.submission_link).not.toMatchObject(
      updates.submission_link
    );
    expect(lessonNotUpdated.title).not.toBe(updates.title);
  });

  test("does not update lesson if provided in update object 'submission_link' includes not valid url and returns error", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      title: faker.lorem.words(),
      submission_link: { label: faker.lorem.words(), url: faker.lorem.words() }, // url has to be valid url, not a plain string
    };
    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    const lessonNotUpdated = await db
      .collection("lessons")
      .findOne({ _id: randomLesson._id });

    expect(lessonNotUpdated.submission_link).not.toMatchObject(
      updates.submission_link
    );
    expect(lessonNotUpdated.title).not.toBe(updates.title);
  });

  test("returns an error if update data not provided or only unsupported properties are provided", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      fake_title: faker.lorem.words(),
      fake_mindset: faker.lorem.words(),
    };

    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();

    // call api with empty updates object
    const responseToEmptyUpdate = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: {},
      }
    );
    expect(responseToEmptyUpdate.ok()).toBeFalsy();
  });

  test("does not delete (soft delete) lesson in PATCH and returns an error if deleted_at provided with a date object", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const updates = {
      deleted_at: faker.date.recent(),
    };
    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeFalsy();
    const lessonNotDeleted = await db
      .collection("lessons")
      .findOne({ _id: randomLesson._id });
    expect(lessonNotDeleted.deleted_at).toBeFalsy();
  });

  test("undeletes a lesson if deleted_at set to null provided in updates", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $ne: null } });

    const updates = {
      deleted_at: null,
    };
    const response = await request.patch(
      `/api/v1/lessons/${randomLesson._id}`,
      {
        data: updates,
      }
    );
    expect(response.ok()).toBeTruthy();
    const data = (await response.json()).data;
    expect(data.deleted_at).toBeNull();
    // set deleted_at property back to date object
    const getResponse = await request.delete(
      `/api/v1/lessons/${randomLesson._id}`
    );
    expect(getResponse.ok()).toBeTruthy();
  });

  test("returns 404 if lesson to update is not found", async ({ request }) => {
    // check if response is falsy if lesson not found
    const nonExistedId = faker.database.mongodbObjectId();
    const updates = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 1, max: 100 }),
      submission_link: {
        label: faker.lorem.words(),
        url: faker.internet.url(),
      },
    };

    //call PATCH to  update a lesson by id
    const response = await request.patch(`/api/v1/lessons/${nonExistedId}`, {
      data: updates,
    });
    // check if response is NOT OK if the lesson not found in db
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  // DELETE TESTS
  test("deletes a lesson by id by changing deleted_at property", async ({
    request,
    db,
  }) => {
    const randomLesson = await db
      .collection("lessons")
      .findOne({ deleted_at: { $eq: null } });

    const response = await request.delete(
      `/api/v1/lessons/${randomLesson._id}`
    );

    // check if response is OK
    expect(response.ok()).toBeTruthy();

    //check db if the lesson with given id has property deleted_at set to a Date object after deletion operation
    const deletedLesson = await db
      .collection("lessons")
      .findOne({ _id: randomLesson._id });

    expect(deletedLesson.deleted_at instanceof Date).toBeTruthy();
  });

  test("returns 404 if lesson to delete is not found", async ({ request }) => {
    // check if response is falsy if lesson not found
    const nonExistedId = faker.database.mongodbObjectId();
    //call DELETE to delete a lesson by id
    const response = await request.delete(`/api/v1/lessons/${nonExistedId}`);
    // check if response is NOT OK if the lesson not found in db
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});
