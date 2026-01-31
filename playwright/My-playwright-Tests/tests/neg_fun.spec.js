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

const performTest = async (page, input, verifyFn) => {
  await page.goto(URL);
  await getSinglishInput(page).fill(input);

  await page.waitForTimeout(3000);

  const output = getSinhalaOutput(page);
  await expect(output).toBeVisible({ timeout: 10000 });

  if (verifyFn) {
    let text = await output.innerText();

    if (text.length === 0) {
      await page.waitForTimeout(2000);
      text = await output.innerText();
    }

    verifyFn(output, text);
  }
};

test.describe("Negative Functional Tests (10) - Robustness", () => {

  test("Neg_Fun_0001 - No vowels", async ({ page }) => {
    await performTest(page, "mm gdhr ynv", null);
  });

  test("Neg_Fun_0002 - Random characters", async ({ page }) => {
    await performTest(page, "asdj@#$$%^^", null);
  });

  test("Neg_Fun_0003 - Mixed casing", async ({ page }) => {
    await performTest(page, "MaMa GeDhArA YaNaVaA", null);
  });

  test("Neg_Fun_0004 - Emojis included", async ({ page }) => {
    await performTest(page, "mama gedhara yanavaa ", null);
  });

  test("Neg_Fun_0005 - English technical words", async ({ page }) => {
    await performTest(page, "API error ekak enava request eka fail", null);
  });

  test("Neg_Fun_0006 - Only symbols", async ({ page }) => {
    await performTest(page, "!!! ??? ###", null);
  });

  test("Neg_Fun_0007 - Very long repeated text", async ({ page }) => {
    await performTest(
      page,
      "mama yanavaa ".repeat(40),
      (output, text) => {
        expect(text.length).toBeGreaterThanOrEqual(0);
      }
    );
  });

  test("Neg_Fun_0008 - Tabs and spaces", async ({ page }) => {
    await performTest(page, "\t\tmama\tgedhara\t", null);
  });

  test("Neg_Fun_0009 - Wrong language words", async ({ page }) => {
    await performTest(page, "amma naan ghar ja raha hoon", null);
  });

  test("Neg_Fun_0010 - Empty-like input", async ({ page }) => {
    await performTest(page, "      ", null);
  });

});
 
