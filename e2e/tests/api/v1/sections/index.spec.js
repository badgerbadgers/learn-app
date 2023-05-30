import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("/api/v1/sections", () => {
  //GET TESTS
  test("returns all sections from database", async ({ request }) => {
    const res = await request.get(`/api/v1/sections`);

    expect(res.status()).toBe(200);
    expect(res.ok()).toBeTruthy();

    const sections = (await res.json()).data;
    expect(sections.length).toBeGreaterThan(5);

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
