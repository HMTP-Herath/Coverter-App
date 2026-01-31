const { test, expect } = require("@playwright/test");

const URL = "https://www.swifttranslator.com/";

const getSinglishInput = (page) =>
  page.getByPlaceholder("Input Your Singlish Text Here.");

const getSinhalaPanel = (page) =>
  page.locator("div.panel-title", { hasText: "Sinhala" });

test.describe("Negative UI Tests (10) - Swift Translator UI Robustness", () => {

  test("Neg_UI_001 - Page should not crash on load", async ({ page }) => {
    await page.goto(URL);
    await expect(getSinglishInput(page)).toBeVisible();
  });

  test("Neg_UI_002 - UI handles empty input gracefully", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).fill("");
    await page.waitForTimeout(2000);
    await expect(getSinglishInput(page)).toBeVisible();
  });

  test("Neg_UI_003 - UI handles only spaces input", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).fill("      ");
    await page.waitForTimeout(2000);
    await expect(getSinglishInput(page)).toBeVisible();
  });

  test("Neg_UI_004 - UI does not break with only symbols", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).fill("!!! ### $$$");
    await page.waitForTimeout(2000);
    await expect(getSinhalaPanel(page)).toBeVisible();
  });

  test("Neg_UI_005 - UI does not break with emojis only", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).fill("😄🔥🚀");
    await page.waitForTimeout(2000);
    await expect(getSinglishInput(page)).toBeVisible();
  });

  test("Neg_UI_006 - UI remains stable with extremely long input", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).fill("test ".repeat(200));
    await page.waitForTimeout(2000);
    await expect(getSinglishInput(page)).toBeVisible();
  });

  test("Neg_UI_007 - UI handles mixed languages input", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).fill("amma naan ghar ja raha hoon");
    await page.waitForTimeout(2000);
    await expect(getSinhalaPanel(page)).toBeVisible();
  });

  test("Neg_UI_008 - Rapid typing does not freeze UI", async ({ page }) => {
    await page.goto(URL);
    await getSinglishInput(page).type("mamagidharayanavaa", { delay: 10 });
    await page.waitForTimeout(2000);
    await expect(getSinglishInput(page)).toBeVisible();
  });

  test("Neg_UI_009 - UI remains usable after clearing input", async ({ page }) => {
    await page.goto(URL);
    const input = getSinglishInput(page);
    await input.fill("mama yanavaa");
    await page.waitForTimeout(1000);
    await input.fill("");
    await page.waitForTimeout(1000);
    await expect(input).toBeVisible();
  });

  test("Neg_UI_010 - UI remains intact after multiple refreshes", async ({ page }) => {
    await page.goto(URL);
    await page.reload();
    await page.reload();
    await expect(getSinglishInput(page)).toBeVisible();
  });

});
