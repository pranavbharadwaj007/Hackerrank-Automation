const loginLink = "https://www.hackerrank.com/auth/login";
const codesObj = require("./codes");
const puppeteer = require("puppeteer");
const email = "";
const password = "";
(async function () {
  try {
    let browserOpen = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"],
    });
    let newTab = await (await browserOpen).newPage();
    await newTab.goto(loginLink);
    await newTab.type("input[id='input-1']", email, { delay: 50 });
    await newTab.type("input[id='input-2']", password, { delay: 50 });
    await newTab.click('button[data-analytics="LoginPassword"]', {
      delay: 50,
    });
    await waitAndClick(".topic-card a[data-attr1='algorithms']", newTab);
    await waitAndClick('input[value="warmup"]', newTab);
    let allChallenges = await newTab.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 100 }
    );
    console.log("question length = ", allChallenges.length);
    await questionSolver(newTab, allChallenges[0], codesObj.answers[0]);
  } catch (error) {
    console.log(error);
  }
})();
async function waitAndClick(selector, cPage) {
  await cPage.waitForSelector(selector);
  let selectorClicked = cPage.click(selector);
  return selectorClicked;
}
async function questionSolver(page, question, answer) {
  try {
    await question.click();
    await waitAndClick(".monaco-editor.no-user-select.vs", page);
    await waitAndClick(".checkbox-input", page);
    await page.waitForSelector("textarea.custominput", { visible: true });
    await page.type("textarea.custominput", answer, { delay: 10 });
    await page.keyboard.down("Control");
    await page.keyboard.press("A", { delay: 100 });
    await page.keyboard.press("X", { delay: 100 });
    await page.keyboard.up("Control");
    await waitAndClick(".monaco-editor.no-user-select.vs", page);
    await page.keyboard.down("Control");
    await page.keyboard.press("A", { delay: 100 });
    await page.keyboard.press("V", { delay: 100 });
    await page.keyboard.up("Control");
    await page.click(".hr-monaco__run-code", { delay: 50 });
  } catch (err) {
    console.log(err);
  }
}
