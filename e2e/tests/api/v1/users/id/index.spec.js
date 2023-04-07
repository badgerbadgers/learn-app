import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";

test.describe("/api/v1/users/id", () => {
  //PATCH TESTS

  test("change a user name, email and gh", async ({ request }) => {
    const userId = "62b22b42f4da59dbea98071b";
    let updateUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      gh: faker.random.alphaNumeric(10),
    };

    //change user name, email, gh
    const patchResponse = await request.patch(`/api/v1/users/${userId}`, 
      {data: updateUser}
    );

    expect(patchResponse.ok()).toBeTruthy();

    //get user by id and compare updated values
    const getResponse = await request.get(`/api/v1/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getUser = (await getResponse.json()).data;
    expect(updateUser.name).toBe(getUser.name);
    expect(updateUser.email).toBe(getUser.email);
    expect(updateUser.gh).toBe(getUser.gh);
  });

 
});
