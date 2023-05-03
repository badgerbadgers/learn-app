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
      _id: id,
      title: faker.lorem.words(5),
      order: faker.datatype.number(10),
      course: faker.database.mongodbObjectId(),
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

    //call db get patched document, then check if document was patched
    const patchedSection = await db
      .collection("sections")
      .findOne({ _id: sectionToPatch._id });

    expect(patchedSection.title).toMatch(patchedSectionObj.title);
    expect(patchedSection.order).toBe(patchedSectionObj.order);
  });

  //SOFT DELETE TESTS
  test("can soft delete section in the database", async ({ request, db }) => {
    //get section id
    const sectionToDelete = await db
      .collection("sections")
      .findOne({ deleted_at: { $eq: null } });
    const id = sectionToDelete._id.toString();

    //make DELETE req
    const response = await request.delete(`/api/v1/sections/${id}`);

    expect(response.ok()).toBeTruthy();
    const deletedsection = await response.json();
    expect(deletedsection).toMatchObject({
      message: "Section has been deleted",
    });
    //get document by id and confirm page has been soft deleted
    const confirmSectionDeleted = await db
      .collection("sections")
      .findOne({ _id: sectionToDelete._id });

    expect(confirmSectionDeleted.deleted_at).not.toBeNull();
  });

  //UNDELETE TESTS
  test.only("tests a section that will be undeleted in the database", async ({
    request,
    db,
  }) => {
    //get section that has been deleted
    const sectionToUndelete = await db
      .collection("sections")
      .findOne({ deleted_at: { $ne: null } });
    console.log("undelete", sectionToUndelete);
    const id = sectionToUndelete._id.toString();
    console.log("id", id);
    //PATCH obj
    const undeletePatchObj = {
      deleted_at: null,
    };

    //make PATCH req
    const response = await request.patch(
      `/api/v1/sections/${id}`,
      undeletePatchObj
    );

    //assertions for data
    expect(response.ok()).toBeTruthy();
    const updatedsection = (await response.json()).data;
    expect(updatedsection.deleted_at).toBeNull();
  });
});
