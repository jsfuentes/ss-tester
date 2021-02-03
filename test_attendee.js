const puppeteer = require("puppeteer");
const actions = require("./actions");

const TOTAL_TABS = process.env.TABS || 10;

async function f() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1430, height: 670 },
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
    ],
  });

  let pages = [];
  console.time(`Opened ${TOTAL_TABS} pages`);
  for (let i = 0; i < TOTAL_TABS; i++) {
    let page = await actions.newPage(browser);

    try {
      console.log(`Opening page ${i}`);
      console.time(`Page ${i}`);
      page = await actions.loginToEvent(page);
      // page = await actions.joinTable(page);
      console.timeEnd(`Page ${i}`);
    } catch (err) {
      console.error(err);
      page.close();
      continue;
    }

    pages.push(page);
  }
  console.timeEnd(`Opened ${TOTAL_TABS} pages`);

  // await browser.close();
}

f()
  .then(() => console.log("FINISH"))
  .catch(console.error);
