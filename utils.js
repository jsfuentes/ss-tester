const CLICK_BY_TEXT_RETRIES = 30;
const CLICK_BY_TEXT_RETRY_DELAY = 500;

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

//CONFIG THE VALUE FOR THIS DELAY
function randomDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 2000) + 777);
  });
}
async function clickByText(page, htmlEl, text) {
  await clickByTextHelper(page, htmlEl, text, 0);
}

function escapeXpathString(str) {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
}

async function clickByTextHelper(page, htmlEl, text, count) {
  try {
    const escapedText = escapeXpathString(text);
    const linkHandlers = await page.$x(
      `//${htmlEl}[contains(text(), ${escapedText})]`
    );

    if (linkHandlers.length > 0) {
      console.log("Clicking", text);
      await linkHandlers[0].click();
    } else {
      throw new Error(`Link not found: ${text}`);
    }
  } catch (err) {
    if (count < CLICK_BY_TEXT_RETRIES) {
      console.log("Retrying", text);
      await delay(CLICK_BY_TEXT_RETRY_DELAY);
      await clickByTextHelper(page, htmlEl, text, count + 1);
    } else {
      throw err;
    }
  }
}

module.exports = {
  delay,
  randomDelay,
  clickByText,
};
