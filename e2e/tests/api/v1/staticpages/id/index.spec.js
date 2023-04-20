import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
//make smaller tests for each obj
//make tests expecting data i sent
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
    const id = staticPageToUpdate._id.toString();

    //FULL PATCH OBJ
    const allFieldsUpdated = {
      isShown: faker.datatype.boolean(),
      wordpress_id: faker.datatype.number(10000),
      slug: faker.lorem.slug(2),
      title: faker.lorem.words(2),
    };

    //PARTIAL PATCH OBJ
    const twoFieldsUpdated = {
      isShown: faker.datatype.boolean(),
      wordpress_id: faker.datatype.number(10000),
    };

    //NON EXISTANT OBJ FIELDS
    const nonExistantFields = {
      fakeField: "this wont work",
      fakeField2: "this also wont work",
    };

    //PATCH REQ FOR ALL FIELDS
    const updatedresponse = await request.patch(
      `/api/v1/staticpages/63e14ad6b8f9d3b00a64dc22`,
      { data: { allFieldsUpdated } }
    );

    //PATCH RESPONSE OK
    expect(updatedresponse.ok()).toBeTruthy();
    const patcheddata = (await updatedresponse.json()).data;
    console.log("patched", patcheddata);
    console.log("allFieldsUpdated", allFieldsUpdated);
    // expect(patcheddata).toContainEqual(allFieldsUpdated);

    //PATCH REQ FOR TWO FIELDS OBJ
    const updatedresponsepartialpatch = await request.patch(
      `/api/v1/staticpages/63e14ad6b8f9d3b00a64dc22`,
      {
        data: { twoFieldsUpdated },
      }
    );

    expect(updatedresponse.ok()).toBeTruthy();
    const patchedpartialpatchdata = (await updatedresponsepartialpatch.json())
      .data;
    // expect(patchedpartialpatchdata).toMatchObject(twoFieldsUpdated);

    //FIELDS DONT EXIST PATCH REQ
    const fielddoesnotexistresponse = await request.patch(
      `/api/v1/staticpages/63e14ad6b8f9d3b00a64dc22`,
      {
        data: nonExistantFields,
      }
    );
    expect(fielddoesnotexistresponse.ok()).toBeTruthy();
    const responsejson = await fielddoesnotexistresponse.json();
    //additional tests
    //make smaller tests
    expect(responsejson).not.toMatchObject(allFieldsUpdated);
  });

  //SOFT DELETE TESTS
  test("returns a static page that has a new field deleted_at", async ({
    request,
    db,
  }) => {
    //Get a staticpage
    const staticPageToDelete = await db
      .collection("staticpages")
      .findOne({ deleted_at: { $eq: null } });

    //static page that is deleted_at: null
    const undeletedStaticPage = {
      deleted_at: null,
    };
    //DELETE REQ
    const deletedResponse = await request.delete(
      `/api/v1/staticpages/${staticPageToDelete._id}`
    );
    //after req, res should be ok no err
    expect(deletedResponse).toBeOK();
    const responsejson = await deletedResponse.json();

    //test for success msg
    expect(responsejson).toEqual({ message: "Page has been deleted." });

    //read db with id and make sure deleted at is not null
    const staticPagePostDelete = await db
      .collection("staticpages")
      .findOne({ _id: new ObjectId(staticPageToDelete._id) });
    expect(staticPagePostDelete.deleted_at).not.toBeNull();

    //A test for undeleting a static page []
    const undeletedResponse = await request.patch(
      `/api/v1/staticpages/${undeletedStaticPage._id}`
    );
    expect(undeletedResponse.deleted_at).toBeUndefined();
  });
});
