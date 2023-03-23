import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("Users API", () => {
  test("shouldn't allow adding a user with no name", async ({ request }) => {
    const data = {
      email: "new@codethedream.org",
      gh: "new_user",
    };
    const addResponse = await request.post("/api/users", { data });
    //check for 400 error response
    expect(addResponse).not.toBeOK();

    //check getUsers to make sure user has been added
    const getResponse = await request.get(`/api/users`);
    expect(getResponse).toBeOK();

    const users = (await getResponse.json()).data;
    expect(users).not.toContainEqual(
      expect.objectContaining({ gh: "new_user" })
    );

    //make sure the list of users does not includes the new user we just added
    expect(users).not.toContainEqual(
      expect.objectContaining({ email: "new@codethedream.org" })
    );
  });

  test("should allow adding a user", async ({ request, db }) => {
    const data = {
      name: "new user",
      email: "new@codethedream.org",
      gh: "new_user",
    };
    const addResponse = await request.post("/api/users", { data });
    //check for 200ok response
    expect(addResponse).toBeOK();

    const addedUser = (await addResponse.json()).data;
    // console.log(await addResponse.json());
    //check new user is not an admin
    expect(addedUser.is_admin).toBeFalsy();

    //check new user has same name, email and gh and we asked for
    expect(addedUser.name).toEqual(data.name);
    expect(addedUser.email).toEqual(data.email);
    expect(addedUser.gh).toEqual(data.gh);

    //check getUsers to make sure user has been added
    const getResponse = await request.get(`/api/users`);
    expect(getResponse).toBeOK();
    //we're expecting 3 users as the DB is seeded with 2 test users
    const users = (await getResponse.json()).data;
    expect(users).toContainEqual(expect.objectContaining({ gh: "new_user" }));

    //make sure the list of users includes the new user we just added
    expect(users).toContainEqual(
      expect.objectContaining({ _id: addedUser._id })
    );

    expect(users).toContainEqual(
      expect.objectContaining({ email: "new@codethedream.org" })
    );

    await db.collection("users").deleteOne({ email: "new@codethedream.org" });
  });
});
