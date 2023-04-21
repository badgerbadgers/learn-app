import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

//make smaller tests for each obj
//make tests expecting data i sent
const { ObjectId } = require("mongodb");
test.describe("/api/v1/staticpages/[id]", () => {
  //PATCH TESTS
  test("returns an updated static page that contains at four updated fields", async ({
    request,
    db,
  }) => {
    //Get a staticpage
    const staticPageToUpdate = await db
      .collection("staticpages")
      .findOne({ wordpress_id: { $ne: null } });
    const id = staticPageToUpdate._id.toString();

    //FULL PATCH OBJ
    const allFieldsUpdated = {
      isShown: faker.datatype.boolean(),
      wordpress_id: faker.datatype.number(10000),
      slug: faker.lorem.slug(2),
      title: faker.lorem.words(2),
    };

    //PATCH REQ FOR ALL FIELDS
    const updatedresponse = await request.patch(`/api/v1/staticpages/${id}`, {
      data: allFieldsUpdated,
    });

    //PATCH RESPONSE OK
    expect(updatedresponse.ok()).toBeTruthy();
    const patcheddata = (await updatedresponse.json()).data;

    expect(patcheddata).toMatchObject(allFieldsUpdated);
  });

  test("returns an updated static page that contains two updated field(s)", async ({
    request,
    db,
  }) => {
    //Get a staticpage
    const staticPageToUpdate = await db
      .collection("staticpages")
      .findOne({ wordpress_id: { $ne: null } });
    const id = staticPageToUpdate._id.toString();

    //PARTIAL PATCH OBJ
    const twoFieldsUpdated = {
      isShown: faker.datatype.boolean(),
      wordpress_id: faker.datatype.number(10000),
    };
    //PATCH REQ FOR TWO FIELDS OBJ
    const updatedresponsepartialpatch = await request.patch(
      `/api/v1/staticpages/${id}`,
      {
        data: twoFieldsUpdated,
      }
    );

    expect(updatedresponsepartialpatch.ok()).toBeTruthy();
    const patchedpartialpatchdata = (await updatedresponsepartialpatch.json())
      .data;
    expect(patchedpartialpatchdata).toMatchObject(twoFieldsUpdated);
  });

  test("returns an undefined variable after a PATCH request with non-existant fields is made", async ({
    request,
    db,
  }) => {
    //Get a staticpage
    const staticPageToUpdate = await db
      .collection("staticpages")
      .findOne({ wordpress_id: { $ne: null } });
    const id = staticPageToUpdate._id.toString();
    //NON EXISTANT OBJ FIELDS
    const nonExistantFields = {
      fakeField: "this wont work",
      fakeField2: "this also wont work",
    };
    //FIELDS DONT EXIST PATCH REQ
    const fielddoesnotexistresponse = await request.patch(
      `/api/v1/staticpages/${id}`,
      {
        data: nonExistantFields,
      }
    );
    expect(fielddoesnotexistresponse.ok()).toBeTruthy();
    const responsejson = await fielddoesnotexistresponse.json().data;
    expect(responsejson).toBeUndefined();
  });

  //SOFT DELETE TESTS
  // test("returns a static page that has a new field deleted_at", async ({
  //   request,
  //   db,
  // }) => {
  //   //Get a staticpage
  //   const staticPageToDelete = await db
  //     .collection("staticpages")
  //     .findOne({ deleted_at: { $eq: null } });

  //   //static page that is deleted_at: null
  //   const undeletedStaticPage = {
  //     deleted_at: null,
  //   };
  //   const id = staticPageToDelete._id;
  //   //DELETE REQ
  //   const deletedResponse = await request.delete(`/api/v1/staticpages/${id}`);
  //   //after req, res should be ok no err
  //   expect(deletedResponse).toBeOK();
  //   const responsejson = await deletedResponse.json();

  //   //test for success msg
  //   expect(responsejson).toEqual({ message: "Page has been deleted." });

  //   //read db with id and make sure deleted at is not null
  //   const staticPagePostDelete = await db
  //     .collection("staticpages")
  //     .findOne({ _id: id });
  //   expect(staticPagePostDelete.deleted_at).not.toBeNull();

  //   //A test for undeleting a static page []
  //   const undeletedResponse = await request.patch(`/api/v1/staticpages/${id}`);
  //   expect(undeletedResponse.deleted_at).toBeUndefined();
  // });
  test("soft deletes a static page", async ({ request, db }) => {
    //Get a staticpage
    const staticPageToDelete = await db
      .collection("staticpages")
      .findOne({ deleted_at: { $eq: null } });

    const id = staticPageToDelete._id.toString();
    //DELETE REQ
    const deletedResponse = await request.delete(`/api/v1/staticpages/${id}`);
    //after req, res should be ok no err
    expect(deletedResponse).toBeOK();
    const responsejson = await deletedResponse.json();
    expect(responsejson.message).toContain("Page has been deleted.");

    //get document by id and confirm page has been soft deleted
    const confirmPageDeleted = await db
      .collection("staticpages")
      .findOne({ _id: ObjectId(staticPageToDelete._id) });

    //assertions to check deleted_at is not null
    expect(confirmPageDeleted.deleted_at).not.toBeNull();
    expect(confirmPageDeleted.deleted_at).toBeDefined();
  });
});
