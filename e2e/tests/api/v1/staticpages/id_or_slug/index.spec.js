import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

const { ObjectId } = require("mongodb");
test.describe("/api/v1/staticpages/[id]", () => {
  //GET ID TESTS
  test("gets a static page an as argument", async ({ request, db }) => {
    //gets a document with wordpress_id value that is not null
    const staticpage = await db.collection("staticpages").findOne({
      _id: { $ne: null },
    });
    const id = staticpage._id.toString();

    //hit endpoint with id as path parameter
    const response = await request.get(`/api/v1/staticpages/${id}`);
    const staticpageslug = (await response.json()).data;
    expect(response.ok()).toBeTruthy();
    expect(staticpageslug).toMatchObject(staticpage);
  });

  test.only("test GET request of a static page with invalid id", async ({
    request,
  }) => {
    //get request with invalid id as parameter
    const response = await request.get(`/api/v1/staticpages/999`);
    //check 404 status assertion
    expect(response.status()).toBe(404);
    const invalidpageslug = (await response.json()).data;
    expect(invalidpageslug).toBeUndefined();
  });

  test("test GET request of a static page with isShown boolean set false", async ({
    request,
    db,
  }) => {
    //make get request with isShown false
    const staticpage = await db.collection("staticpages").findOne({
      isShown: { $eq: false },
    });
    const slug = staticpage.slug;

    //hit endpoint with slug as path parameter
    const response = await request.get(`/api/v1/staticpages/${slug}`);

    //check 404 status assertion
    expect(response.status()).toBe(400);
    const staticpageresponse = (await response.json()).data;
    //assertion for undefined or null
    expect(staticpageresponse).toBeUndefined();
  });

  //PATCH TESTS
  test("returns an updated static page that contains at five updated fields", async ({
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
      deleted_at: null,
    };

    //PATCH REQ FOR ALL FIELDS
    const updatedresponse = await request.patch(`/api/v1/staticpages/${id}`, {
      data: allFieldsUpdated,
    });

    //PATCH RESPONSE OK
    expect(updatedresponse.ok()).toBeTruthy();
    const patcheddata = (await updatedresponse.json()).data;
    expect(patcheddata).toMatchObject(allFieldsUpdated);
    expect(patcheddata).toHaveProperty("isShown");
    expect(patcheddata).toHaveProperty("wordpress_id");
    expect(patcheddata).toHaveProperty("slug");
    expect(patcheddata).toHaveProperty("title");

    //get page to see if obj was patched in collection
    const patchedStaticPage = await db
      .collection("staticpages")
      .findOne({ _id: staticPageToUpdate._id });

    //patched page in collection matches patch obj
    expect(patchedStaticPage).toMatchObject(allFieldsUpdated);
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
      deleted_at: null,
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
    expect(patchedpartialpatchdata).toHaveProperty("isShown");
    expect(patchedpartialpatchdata).toHaveProperty("wordpress_id");

    //find page after patch and see if new obj was added
    const updatedpartialstaticpage = await db
      .collection("staticpages")
      .findOne({ _id: staticPageToUpdate._id });
    expect(updatedpartialstaticpage).toMatchObject(twoFieldsUpdated);
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
      isShown: null,
      fakeField: "this wont work",
      fakeField2: "this also wont work",
    };
    //add one field that does exist
    //FIELDS DONT EXIST PATCH REQ
    const fielddoesnotexistresponse = await request.patch(
      `/api/v1/staticpages/${id}`,
      {
        data: nonExistantFields,
      }
    );
    //then check updated obj will not include fake fields
    expect(fielddoesnotexistresponse.ok()).toBeTruthy();
    const responsejson = await fielddoesnotexistresponse.json().data;
    expect(responsejson).toBeUndefined();
    expect(responsejson).not.toBeDefined();
  });

  //SOFT DELETE TESTS
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
    const responsejson = (await deletedResponse.json()).data;

    //get document by id and confirm page has been soft deleted
    const confirmPageDeleted = await db
      .collection("staticpages")
      .findOne({ _id: staticPageToDelete._id });

    //assertions to check deleted_at is not null
    expect(confirmPageDeleted.deleted_at).not.toBeNull();
  });

  test("undeletes a static page", async ({ request, db }) => {
    //GET PAGE
    const staticPageToUnDelete = await db
      .collection("staticpages")
      .findOne({ deleted_at: { $ne: null } });

    const id = staticPageToUnDelete._id.toString();

    //UNDELETE PATCH OBJ
    const undeletedObj = {
      deleted_at: null,
    };
    //PATCH REQ FOR UNDELETE OBJ
    const undeletedpatchreq = await request.patch(`/api/v1/staticpages/${id}`, {
      data: undeletedObj,
    });

    expect(undeletedpatchreq.ok()).toBeTruthy();
    const responsejson = (await undeletedpatchreq.json()).data;
    expect(responsejson.deleted_at).toBeNull();
  });
});
