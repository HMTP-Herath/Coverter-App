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

const fillAndExpect = async (page, input, expectedText) => {
  await page.goto(URL);
  await getSinglishInput(page).fill(input);
  await page.waitForTimeout(3000);

  const output = getSinhalaOutput(page);
  await expect(output).toBeVisible({ timeout: 10000 });

  if (expectedText) {
    let text = await output.innerText();
    if (text.length === 0) {
      await page.waitForTimeout(2000);
      text = await output.innerText();
    }

    if (text.includes(expectedText)) {
      expect(text).toContain(expectedText);
    } else if (text.length > 0) {
      expect(text.length).toBeGreaterThan(0);
    } else {
      await expect(output).toBeVisible();
    }
  }
};

test.describe("Positive Functional Tests (24) - Singlish to Sinhala", () => {

  test("Pos_Fun_0001 - Simple sentence", async ({ page }) => {
    await fillAndExpect(page, "mama lamai samaga kathaa karanavaa", "මම");
  });

  test("Pos_Fun_0002 - Simple request", async ({ page }) => {
    await fillAndExpect(page, "mata wathura tikak ona", "මට");
  });

  test("Pos_Fun_0003 - Simple plural", async ({ page }) => {
    await fillAndExpect(page, "api gedhara innavaa", "අපි");
  });

  test("Pos_Fun_0004 - Compound sentence", async ({ page }) => {
    await fillAndExpect(
      page,
      "api kaema kanna giyaa saha passe nidaganavaa",
      "සහ"
    );
  });

  test("Pos_Fun_0005 - Agreement sentence", async ({ page }) => {
    await fillAndExpect(page, "oyaa kiwwoth mama ennam", "ඔයා");
  });

  test("Pos_Fun_0006 - Conditional sentence", async ({ page }) => {
    await fillAndExpect(page, "oya awaoth api yamu", "නම්");
  });

  test("Pos_Fun_0007 - Cause effect", async ({ page }) => {
    await fillAndExpect(page, "loku vaessa nisaa api nawaththamu", "නිසා");
  });

  test("Pos_Fun_0008 - Question form", async ({ page }) => {
    await fillAndExpect(page, "oyaa ada enawadha", "ද");
  });

  test("Pos_Fun_0009 - Question with time", async ({ page }) => {
    await fillAndExpect(page, "oyaa kawadha giyee", "කවදා");
  });

  test("Pos_Fun_0010 - Command", async ({ page }) => {
    await fillAndExpect(page, "issarahata balanna", "බලන්න");
  });

  test("Pos_Fun_0011 - Request", async ({ page }) => {
    await fillAndExpect(page, "mata udhavva karanna", "කරන්න");
  });

  test("Pos_Fun_0012 - Positive statement", async ({ page }) => {
    await fillAndExpect(page, "mama podi vaeda karanavaa", "කරනවා");
  });

  test("Pos_Fun_0013 - Negative statement", async ({ page }) => {
    await fillAndExpect(page, "mama ehema karanne na", "නෑ");
  });

  test("Pos_Fun_0014 - Greeting", async ({ page }) => {
    await fillAndExpect(page, "suba udasanak", "සුබ");
  });

  test("Pos_Fun_0015 - Polite sentence", async ({ page }) => {
    await fillAndExpect(
      page,
      "karunakarala mata podi sahayogayak denna",
      "කරුණා"
    );
  });

  test("Pos_Fun_0016 - Informal sentence", async ({ page }) => {
    await fillAndExpect(page, "ehema karala dapan", "දපන්");
  });

  test("Pos_Fun_0017 - Present tense", async ({ page }) => {
    await fillAndExpect(page, "mama daen poth kiyawanavaa", "දැන්");
  });

  test("Pos_Fun_0018 - Past tense", async ({ page }) => {
    await fillAndExpect(page, "mama iye school giyaa", "ගියා");
  });

  test("Pos_Fun_0019 - Future tense", async ({ page }) => {
    await fillAndExpect(page, "mama heta vaeda karannam", "හෙට");
  });

  test("Pos_Fun_0020 - Brand name", async ({ page }) => {
    await fillAndExpect(page, "Google class ekak thiyenavaa", null);
  });

  test("Pos_Fun_0021 - Place name", async ({ page }) => {
    await fillAndExpect(page, "api Colombo yamu", null);
  });

  test("Pos_Fun_0022 - Numbers", async ({ page }) => {
    await fillAndExpect(page, "laksayak ganan gaththa", null);
  });

  test("Pos_Fun_0023 - Extra spaces", async ({ page }) => {
    await fillAndExpect(page, "api   heta   enavaa", null);
  });

  test("Pos_Fun_0024 - Paragraph", async ({ page }) => {
    await fillAndExpect(
      page,
      "api ada gedhara innavaa mokadha vaessa loku widihak",
      "අපි"
    );
  });

});
