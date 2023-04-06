import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/staticpages/[id]", () => {
  //PATCH TESTS
  test("returns an array with a static page that contains at least one or more updated field(s)", async ({
    request,
    db,
  }) => {
    const response = await request.get(`/api/v1/staticpages`);
    expect(response.ok()).toBeTruthy();

    //Get a staticpage
    const staticPageToUpdate = await db
      .collection("staticpages")
      .findOne({ wordpress_id: { $ne: null } });

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
    const data = (await response.json()).data;
  });
});
