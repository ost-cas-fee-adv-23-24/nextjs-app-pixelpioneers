import { expect, test } from "@playwright/test";

test("check if button is here", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page
    .getByRole("button", { name: "hello I am a design system button" })
    .click();
  await expect(
    page.getByRole("button", { name: "hello I am a design system button" }),
  ).toBeVisible();
});

test("check if link button is here", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByText("hello I am a design system link button").click();
  await expect(
    page.getByText("hello I am a design system link button"),
  ).toBeVisible();
});
