const { test, expect } = require("@playwright/test");

const URL = "https://www.swifttranslator.com/";

const getSinglishInput = (page) =>
  page.getByPlaceholder("Input Your Singlish Text Here.");

const getSinhalaOutput = (page) =>
  page
    .locator("div.panel-title", { hasText: "Sinhala" })
    .locator("..")
    .locator("div")
    .filter({ hasNotText: "Sinhala" })
    .first();

test("Pos_UI_0001 - Real-time Sinhala output update", async ({ page }) => {
  await page.goto(URL);

  const singlishInput = getSinglishInput(page);
  const sinhalaOutput = getSinhalaOutput(page);

  // Type first part and wait for transliteration
  await singlishInput.fill("mama gedhara");
  await page.waitForTimeout(3000);

  // Verify output is visible
  await expect(sinhalaOutput).toBeVisible({ timeout: 10000 });

  // Add more text
  await singlishInput.fill("mama gedhara yanavaa");
  await page.waitForTimeout(3000);

  // Verify output is visible (transliteration may have variable timing)
  await expect(sinhalaOutput).toBeVisible({ timeout: 10000 });
});


test("Pos_UI_0002 - Real-time Sinhala output update", async ({ page }) => {
  await page.goto(URL);

  const singlishInput = getSinglishInput(page);
  const sinhalaOutput = getSinhalaOutput(page);

  // Type first part and wait for transliteration
  await singlishInput.fill("mata bath");
  await page.waitForTimeout(3000);

  // Verify output is visible
  await expect(sinhalaOutput).toBeVisible({ timeout: 10000 });

  // Add more text
  await singlishInput.fill("mata bath oonee");
  await page.waitForTimeout(3000);

  // Verify output is visible
  await expect(sinhalaOutput).toBeVisible({ timeout: 10000 });
});
