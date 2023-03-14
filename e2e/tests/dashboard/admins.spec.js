import { test, expect } from "e2e/fixtures/testAsAdmin";

test.describe("Admins", () => {
  test("Can view the dashboard", async ({ page }) => {
    //get browser console log and display them
    // page.on("console", (msg) => console.log(msg.text()));

    await page.goto("http://localhost:3000/");

    const logInButton = page.getByRole("button", { name: /log-in/i });
    await expect(logInButton).toHaveCount(0);
  });

  test("Can view user links AND admin links", async ({ page }) => {
    //get browser console log and display them
    // page.on("console", (msg) => console.log(msg.text()));

    //When logged in users go to the homepage/dashboard
    await page.goto("http://localhost:3000/");

    //they can see user links
    await expect(page.getByText("User Data")).toBeVisible();

    //and they can see admin links
    await expect(page.getByText("Admin Data")).toBeVisible();
  });
});
