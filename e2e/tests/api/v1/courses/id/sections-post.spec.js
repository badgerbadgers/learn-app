import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/courses/[id]/sections", () => {
  // POST tests
  test("creates a section for a course when all fields are properly given", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const newSection = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 5, max: 100 }),
      course: randomCourse._id,
    };
    const response = await request.post(
      `/api/v1/courses/${randomCourse._id}/sections`,
      {
        data: newSection,
      }
    );
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newSection);
    expect(responseData._id).toBeDefined();
    expect(responseData.deleted_at).toBeNull();
    expect(responseData.course).toBe(randomCourse._id.toString());
    expect(responseData.order).toBeDefined();
  });

  test("does not create a section if title is missing", async ({
    request,
    db,
  }) => {
    // create a course
    const newCourse = {
      course_name: faker.lorem.words(),
    };
    const courseCreated = await db.collection("courses").insertOne(newCourse);

    const newSection = {
      order: faker.datatype.number({ min: 5, max: 100 }),
      course: courseCreated.insertedId,
    };

    const response = await request.post(
      `/api/v1/courses/${courseCreated.insertedId}/sections`,
      {
        data: newSection,
      }
    );
    expect(response.ok()).toBeFalsy();
    // check if random course which was to be updated was not updated to the duplicate name
    const ifSectionCreated = await db
      .collection("sections")
      .findOne({ course: courseCreated.insertedId, order: newSection.order });
    expect(ifSectionCreated).toBeNull();

    await db.collection("courses").deleteOne({ _id: courseCreated.insertedId });
  });

  test("does not create a section with duplicate section title for the same course", async ({
    request,
    db,
  }) => {
    const randomSection = await db
      .collection("sections")
      .findOne({ deleted_at: null });

    const sectionWithDuplicateTitle = {
      title: randomSection.title,
      order: faker.datatype.number({ min: 5, max: 100 }),
      course: randomSection.course,
    };

    const response = await request.post(
      `/api/v1/courses/${randomSection.course}/sections`,
      {
        data: sectionWithDuplicateTitle,
      }
    );
    expect(response.ok()).toBeFalsy();
    // check if random course which was to be updated was not updated to the duplicate name
    const ifSectionCreated = await db
      .collection("sections")
      .findOne(sectionWithDuplicateTitle);
    expect(ifSectionCreated).toBeNull();
  });

  test("does not create a section for deleted course", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $ne: null } });

    const newSection = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 5, max: 100 }),
      course: randomCourse._id,
    };

    const response = await request.post(
      `/api/v1/courses/${randomCourse.course}/sections`,
      {
        data: newSection,
      }
    );
    expect(response.ok()).toBeFalsy();

    const ifSectionCreated = await db
      .collection("sections")
      .findOne(newSection);
    expect(ifSectionCreated).toBeNull();
  });

  test("does not create a course with deleted_at property set to truthy value (a date)", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const newSection = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 5, max: 100 }),
      course: randomCourse._id,
      deleted_at: faker.date.recent(),
    };

    const response = await request.post(
      `/api/v1/courses/${randomCourse.course}/sections`,
      {
        data: newSection,
      }
    );
    expect(response.ok()).toBeFalsy();

    const ifSectionCreated = await db
      .collection("sections")
      .findOne(newSection);
    expect(ifSectionCreated).toBeNull();
  });

  test("does not create a section for non existent course", async ({
    request,
    db,
  }) => {
    const notExistentCourseId = faker.database.mongodbObjectId();
    const newSection = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 5, max: 100 }),
      course: notExistentCourseId,
      deleted_at: faker.date.recent(),
    };

    const response = await request.post(
      `/api/v1/courses/${notExistentCourseId}/sections`,
      {
        data: newSection,
      }
    );
    expect(response.ok()).toBeFalsy();

    const ifSectionCreated = await db
      .collection("sections")
      .findOne(newSection);
    expect(ifSectionCreated).toBeNull();
  });

  test("creates a section for a course when all required fields are properly given but do not create fields that do not exist in data model", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const newSection = {
      title: faker.lorem.words(),
      order: faker.datatype.number({ min: 5, max: 100 }),
      lesson: faker.lorem.words(),
      topic: faker.lorem.words(),
      course: randomCourse._id,
    };
    const response = await request.post(
      `/api/v1/courses/${randomCourse._id}/sections`,
      {
        data: newSection,
      }
    );
    expect(response.ok()).toBeTruthy();
    const responseData = (await response.json()).data;
    expect(responseData.lesson).toBeUndefined();
    expect(responseData.topic).toBeUndefined();
    expect(responseData._id).toBeDefined();
    expect(responseData.deleted_at).toBeNull();
    expect(responseData.course).toBe(randomCourse._id.toString());
  });

  test("returns an error if section data not provided", async ({
    request,
    db,
  }) => {
    const randomCourse = await db
      .collection("courses")
      .findOne({ deleted_at: { $eq: null } });

    const response = await request.post(
      `/api/v1/courses/${randomCourse._id}/sections`,
      {
        data: {},
      }
    );
    expect(response.ok()).toBeFalsy();
  });
});
