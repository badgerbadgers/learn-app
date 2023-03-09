import { test, expect } from "@playwright/test";

test("Guests are asked to login when loading root", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const logInButton = page.getByRole("button", { name: /log-in/i });
  await expect(logInButton).toBeVisible();

  const signUpButton = page.getByRole("button", { name: /sign-up/i });
  await expect(signUpButton).toBeVisible();
});

test("Guests are asked to login when loading another protected page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/admin/cohort-management");

  const logInButton = page.getByRole("button", { name: /log-in/i });
  await expect(logInButton).toBeVisible();

  const signUpButton = page.getByRole("button", { name: /sign-up/i });
  await expect(signUpButton).toBeVisible();
});
