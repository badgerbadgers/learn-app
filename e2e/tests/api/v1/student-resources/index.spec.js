import { test, expect } from "e2e/fixtures/testAsGuest";

test.describe("/api/v1/staticpages", () => {
  //GET TESTS
  test("returns an array when there are student resources", async ({
    request,
  }) => {
    //GET request all student resources with isShown = true
    const res = await request.get(`/api/v1/student-resources`);
    expect(res.ok()).toBeTruthy();

    const staticpages = (await res.json()).data;

    //check for object containing isShown = true exists
    expect(staticpages).toContainEqual(
      expect.objectContaining({ isShown: true })
    );

    //check for object containing isShown = false does not exists
    expect(staticpages).not.toContainEqual(
      expect.objectContaining({ isShown: false })
    );
    expect(staticpages).not.toContainEqual(
      expect.objectContaining({ isShown: { $ne: null } })
    );
    expect(staticpages.length).toBeGreaterThan(0);
  });
});
