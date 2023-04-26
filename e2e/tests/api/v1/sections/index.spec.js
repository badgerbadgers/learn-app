import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/sections", () => {
  //GET TESTS
  test("runs assertions on array of objects", async ({ request }) => {
    const res = await request.get(`/api/v1/sections`);

    expect(res.ok()).toBeTruthy();

    const sections = (await res.json()).data;
    expect(sections.length).toBeGreaterThan(5);
    expect(sections.length).toBe(6);

    //assertions for hard coded data
    expect(sections[0].course).toContain("62e056cee6daad619e5cc2c5");
    expect(sections[0]._id).toContain("633d9916ec0d4b5e83a6b062");
    expect(sections[0].order).toBe(2);
    expect(sections[0].title).toContain("Git Basics");

    sections.forEach((section) => {
      expect(section).toHaveProperty("_id");
      expect(section).toHaveProperty("course");
      expect(section).toHaveProperty("title");
      expect(section).toHaveProperty("order");
    });

    //assertions for type of each field
    sections.forEach((section) => {
      expect(typeof section.course).toBe("string");
      expect(typeof section.order).toBe("number");
      expect(typeof section._id).toBe("string");
      expect(typeof section.title).toBe("string");
    });

  });
});
