const utils = require("./utils");

// const EVENT_URL = "http://localhost:4000/e/v3NwuAQgdr5I"; //INFINITE NETWORKING
const EVENT_URL = "https://eta-staging.onrender.com/e/rmA2whOe";

async function newPage(browser, traceName) {
  const page = await browser.newPage();
  const domain = new URL(EVENT_URL).hostname;
  await page.deleteCookie({
    name: "_react_phoenix_key",
    domain,
  });

  page.setDefaultNavigationTimeout(30000); //increase timeout to 1 minutes

  if (traceName) {
    console.log("Start tracing");
    await page.tracing.start({
      path: traceName,
      screenshots: true,
    });
  }

  return page;
}

async function loginToEvent(page) {
  await page.goto(EVENT_URL);
  await utils.clickByText(page, "div", "Test User");

  await utils.clickByText(page, "button", "Continue to the Event");
  await utils.delay(200);
  return page;
}

async function joinTable(page) {
  await utils.clickByText(page, "button", "Join Random Table");
  await utils.delay(1500);
  return page;
}

module.exports = { newPage, loginToEvent, joinTable };
