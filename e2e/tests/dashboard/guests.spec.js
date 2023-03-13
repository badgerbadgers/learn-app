import { test, expect } from "e2e/fixtures/testAsGuest";

test.describe("Guest Users", () => {
  test("Are asked to login when loading root", async ({ page }) => {
    //get browser console log and display them
    // page.on("console", (msg) => console.log(msg.text()));

    await page.goto("http://localhost:3000/");

    const logInButton = page.getByRole("button", { name: /log-in/i });
    await expect(logInButton).toBeVisible();

    const signUpButton = page.getByRole("button", { name: /sign-up/i });
    await expect(signUpButton).toBeVisible();
  });

  test("Can't view user links or admin links", async ({ page }) => {
    //get browser console log and display them
    // page.on("console", (msg) => console.log(msg.text()));

    //When logged in users go to the homepage/dashboard
    await page.goto("http://localhost:3000/");

    //they can see user links
    await expect(page.getByText("User Data")).toHaveCount(0);

    //and they can see admin links
    await expect(page.getByText("Admin Data")).toHaveCount(0);
  });
});
