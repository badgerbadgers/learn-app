import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("example of testing API", () => {
  test("should get the list of users", async ({ request }) => {
    const response = await request.get(`/api/users`);
    expect(response).toBeOK();
    const users = (await response.json()).data;
    expect(users).toHaveLength(2);

    // const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    // expect(issues.ok()).toBeTruthy();
    // expect(await issues.json()).toContainEqual(expect.objectContaining({
    //   title: '[Bug] report 1',
    //   body: 'Bug description'
    // }));
  });
});
