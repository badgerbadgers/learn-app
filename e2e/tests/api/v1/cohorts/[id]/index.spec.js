import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/cohorts/id", () => {
  //PATCH TESTS
  //TODO:
  //Find cohort id
  //Update name
  //update slug
  //update start date
  //update schedule

  test("updates a cohort name  ", async ({
    //and slug??????
    request,
    db,
  }) => {
    const newCohortName = {
      cohort_name: faker.lorem.words(),
      //   slug:
    };

    const response = await request.patch(`/api/v1/cohorts/id`, {
      data: newCohortName,
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newCohortName);

    // expect(responseData._id).toBeDefined();
    //expect(responseData.slug).toBeDefined();
    //expect(typeof responseData.slug).toBe("string");

    await db.collection("cohorts");
    //   .deleteOne({ _id: ObjectId(responseData._id) });
  });
});
