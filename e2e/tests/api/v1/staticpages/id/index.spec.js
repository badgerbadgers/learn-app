import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

const { ObjectId } = require("mongodb");
test.describe("/api/v1/staticpages/[id]", () => {
  //PATCH TESTS
  test("returns an updated static page that contains at least one or more updated field(s)", async ({
    request,
    db,
  }) => {
    //Get a staticpage
    const staticPageToUpdate = await db
      .collection("staticpages")
      .findOne({ wordpress_id: { $ne: null } });
    console.log("page id", staticPageToUpdate._id);
    //PATCH OBJ
    const allFieldsUpdated = {
      isShown: faker.datatype.boolean(),
      wordpress_id: faker.datatype.number(10000),
      slug: faker.lorem.slug(2),
      title: faker.lorem.words(2),
    };
    //PATCH REQ
    const updatedresponse = await request.patch(
      `/api/v1/staticpages/${staticPageToUpdate._id}`,
      {
        data: allFieldsUpdated,
      }
    );

    expect(updatedresponse.ok()).toBeTruthy();
    const patcheddata = (await updatedresponse.json()).data;
    expect(patcheddata).toMatchObject(allFieldsUpdated);
  });

  //SOFT DELETE TESTS
  test.describe("api/v1/staticpages/[id]", () => {
    test("returns a static page that has a new field deleted_at", async ({
      request,
      db,
    }) => {
      //Get a staticpage
      const staticPageToDelete = await db
        .collection("staticpages")
        .findOne({ deleted_at: { $eq: null } });
      console.log("page id", staticPageToDelete._id);

      //DELETE REQ
      const deletedResponse = await request.delete(
        `/api/v1/staticpages/${staticPageToDelete._id}`
      );
      //after req, res should be ok no err
      expect(deletedResponse).toBeOK();
      const responsejson = await deletedResponse.json();

      //test for success msg
      expect(responsejson).toEqual({ message: "success" });

      //read db with id and make sure deleted at is not null
      const staticPagePostDelete = await db
        .collection("staticpages")
        .findOne({ _id: new ObjectId(staticPageToDelete._id) });
      expect(staticPagePostDelete.deleted_at).not.toBeNull();
    });
  });
});
