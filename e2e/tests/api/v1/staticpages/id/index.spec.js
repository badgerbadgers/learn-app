import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

const { ObjectId } = require("mongodb");
test.describe("/api/v1/staticpages/[id]", () => {
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
    console.log("patch obj", patcheddata);
    expect(patcheddata).toMatchObject(allFieldsUpdated);

    expect(patcheddata).toHaveProperty("isShown");
    expect(patcheddata).toHaveProperty("wordpress_id");
    expect(patcheddata).toHaveProperty("slug");
    expect(patcheddata).toHaveProperty("title");
    expect(patcheddata.isShown).toBeDefined();
    expect(patcheddata.wordpress_id).toBeDefined();
    expect(patcheddata.slug).toBeDefined();
    expect(patcheddata.title).toBeDefined();
    expect(patcheddata._id).not.toBeNull();

    expect(typeof patcheddata.wordpress_id).toBe("number");
    expect(typeof patcheddata.isShown).toBe("boolean");
    expect(typeof patcheddata._id).toBe("string");
    expect(typeof patcheddata.slug).toBe("string");
    expect(typeof patcheddata.title).toBe("string");

    //get req to see if obj was patched in collection
    const allStaticPages = await db
      .collection("staticpages")
      .findOne({})
      .toArray();
    //in array allstaticpages see if patch req obj was updated
    // expect(typeof allStaticPages).toBe("object");
    // expect(allStaticPages[0]).toContain(patcheddata);
    // expect(allStaticPages[0]).toMatchObject(patcheddata);
    // for (const a of allStaticPages) {
    //   expect(patcheddata).toContainEqual(
    //     expect.objectContaining({ id: new ObjectId(patcheddata._id) })
    //   );
    // }

    // expect(allStaticPages).toContain(patcheddata);

    // expect(allStaticPages[0]).toEqual(
    //   expect.objectContaining({
    //     locationId: expect.any(Number),
    //     geo: expect.any(Array),
    //     isFetching: expect.any(Boolean),
    //   })
    // );
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

    expect(patchedpartialpatchdata).toHaveProperty("isShown");
    expect(patchedpartialpatchdata).toHaveProperty("wordpress_id");
    expect(patchedpartialpatchdata.isShown).toBeDefined();
    expect(patchedpartialpatchdata.wordpress_id).toBeDefined();
    expect(patchedpartialpatchdata.slug).toBeUndefined();
    expect(patchedpartialpatchdata.title).toBeUndefined();
    expect(patchedpartialpatchdata._id).not.toBeNull();
    expect(typeof patchedpartialpatchdata.wordpress_id).toBe("number");
    expect(typeof patchedpartialpatchdata.isShown).toBe("boolean");
    expect(typeof patchedpartialpatchdata._id).toBe("string");
    expect(typeof patchedpartialpatchdata.slug).not.toBe("string");
    expect(typeof patchedpartialpatchdata.title).not.toBe("string");

    //get req and see if new obj was added tests
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

  test("undeletes a static page", async ({ request, db }) => {
    const staticPageToUnDelete = await db
      .collection("staticpages")
      .findOne({ deleted_at: { $ne: null } });

    const id = staticPageToUnDelete._id.toString();

    //UNDELETE PATCH OBJ
    const undeletedObj = {
      deleted_at: null,
      isShown: faker.datatype.boolean(),
      wordpress_id: faker.datatype.number(10000),
    };
    //PATCH REQ FOR UNDELETE OBJ
    const undeletedpatchreq = await request.patch(`/api/v1/staticpages/${id}`, {
      data: undeletedObj,
    });

    expect(undeletedpatchreq.ok()).toBeTruthy();
    const responsejson = await undeletedpatchreq.json();
    expect(responsejson.deleted_at).toBeUndefined();
    expect(responsejson.deleted_at).not.toBeDefined();
  });
});
