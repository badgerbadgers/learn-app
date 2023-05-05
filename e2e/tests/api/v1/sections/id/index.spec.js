import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/sections/{id}", () => {
  //PATCH TESTS
  test("can update fields of a section in the database", async ({
    request,
    db,
  }) => {
    //get section that is not deleted
    const sectionToPatch = await db
      .collection("sections")
      .findOne({ deleted_at: { $eq: null } });
    const id = sectionToPatch._id.toString();
    //PATCH obj
    const patchedSectionObj = {
      title: faker.lorem.words(5),
      order: faker.datatype.number(10),
      deleted_at: null,
    };
    //PATCH req
    const response = await request.patch(`/api/v1/sections/${id}`, {
      data: patchedSectionObj,
    });
    expect(response.ok()).toBeTruthy();
    const updatedsection = (await response.json()).data;

    expect(updatedsection).toMatchObject(patchedSectionObj);
    expect(updatedsection).toHaveProperty("title");
    expect(updatedsection).toHaveProperty("course");
    expect(updatedsection).toHaveProperty("_id");
    expect(updatedsection).toHaveProperty("order");
  });

  //SOFT DELETE TESTS
  test("can soft delete section in the database", async ({ request, db }) => {
    //get section id that has not been deleted
    const sectionToDelete = await db
      .collection("sections")
      .findOne({ deleted_at: { $eq: null } });
    const id = sectionToDelete._id.toString();

    //make DELETE req
    const response = await request.delete(`/api/v1/sections/${id}`);
    expect(response.ok()).toBeTruthy();

    const deletedsection = (await response.json()).data;

    //get document by id and confirm page has been soft deleted
    const confirmSectionDeleted = await db
      .collection("sections")
      .findOne({ _id: sectionToDelete._id });
    expect(confirmSectionDeleted.deleted_at).not.toBeNull();
  });

  //UNDELETE TESTS
  test("tests a section that will be undeleted in the database", async ({
    request,
    db,
  }) => {
    //get section that has been deleted
    const sectionToUndelete = await db
      .collection("sections")
      .findOne({ deleted_at: { $ne: null } });
    const id = sectionToUndelete._id.toString();
    //PATCH obj
    const undeletePatchObj = {
      deleted_at: null,
    };

    //make PATCH req
    const response = await request.patch(`/api/v1/sections/${id}`, {
      data: undeletePatchObj,
    });

    //assertions for data
    expect(response.ok()).toBeTruthy();
    const updatedsection = (await response.json()).data;
    expect(updatedsection.deleted_at).toBeNull();
  });
});
