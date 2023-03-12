import { test, expect } from "@playwright/test";


test.describe("Guest Users", () => {
  test("are asked to login when loading root", async ({ page }) => {
    //get browser console log and display them
    // page.on("console", (msg) => console.log(msg.text()));

    await page.goto("http://localhost:3000/dashboard");

    const logInButton = page.getByRole("button", { name: /log-in/i });
    await expect(logInButton).toBeVisible();

    const signUpButton = page.getByRole("button", { name: /sign-up/i });
    await expect(signUpButton).toBeVisible();
  });
});

test.describe("Logged In Users", () => {
  console.log(process.env);
  test.use({ storageState: process.env.STORAGE_STATE_USER });

  test("Can view the dashboard", async ({ page }) => {
    //get browser console log and display them
    // page.on("console", (msg) => console.log(msg.text()));

    await page.goto("http://localhost:3000/dashboard");

    const logInButton = page.getByRole("button", { name: /log-in/i });
    await expect(logInButton).toHaveCount(0);
  });
});



// test("Guests are asked to login when loading another protected page", async ({
//   page,
// }) => {
//   await page.goto("http://localhost:3000/admin/cohort-management");

//   const logInButton = page.getByRole("button", { name: /log-in/i });
//   await expect(logInButton).toBeVisible();

//   const signUpButton = page.getByRole("button", { name: /sign-up/i });
//   await expect(signUpButton).toBeVisible();
// });
