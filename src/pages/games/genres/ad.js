const { Keyboard } = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const pluginProxy = require("puppeteer-extra-plugin-proxy");

puppeteer.use(StealthPlugin());

puppeteer.use(
  pluginProxy({
    address: "socks://192.168.1.4",
    port: 50007,
  })
);

const googleUsername1 = "RomeoCuevas@gadgetupdate.my.id";
const googlePassword = "Losed123";
const ua =
  "Mozilla/5.0 (Linux; arm_64; Android 12; CPH2205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.3.86.00 SA/3 Mobile Safari/537.36";

async function runAdsenseBot() {
  const botConfiguration = {
    headless: false,
    ignoreHTTPSErrors: false,
    defaultViewport: {
      isMobile: true,
      width: 375,
      height: 768,
    },
    args: ["--window-size=375,768"],
  };

  const chromeBrowser = await puppeteer.launch(botConfiguration);

  try {
    const chromeBrowserPage1 = await chromeBrowser.newPage();
    await chromeBrowserPage1.setJavaScriptEnabled(true);
    await chromeBrowserPage1.setUserAgent(ua);
    await chromeBrowserPage1.goto(
      "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage1.type('input[type="email"]', googleUsername1);
    await chromeBrowserPage1.waitForTimeout(10000);
    await chromeBrowserPage1.keyboard.press("Enter");
    await chromeBrowserPage1.waitForTimeout(10000);
    await chromeBrowserPage1.type('input[type="password"]', googlePassword);
    await chromeBrowserPage1.waitForTimeout(10000);
    await chromeBrowserPage1.keyboard.press("Enter");
    await chromeBrowserPage1.waitForTimeout(20000);
    // await chromeBrowserPage1.type('input[type="submit"]', 'confirm');
    // await chromeBrowserPage1.waitForTimeout(10000);
    // await chromeBrowserPage1.keyboard.press('Enter');
    // await chromeBrowserPage1.waitForTimeout(10000);
    const chromeBrowserPage2 = await chromeBrowser.newPage();
    await chromeBrowserPage2.setJavaScriptEnabled(true);
    await chromeBrowserPage2.emulateTimezone("America/Los_Angeles");
    await chromeBrowserPage2.setUserAgent(
      "Mozilla/5.0 (Linux; arm_64; Android 12; CPH2205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.3.86.00 SA/3 Mobile Safari/537.36"
    );
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/stay-legal-avoiding-insurance-fraud/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/health-insurance-when-living-abroad/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/attract-employees-group-health-insurance/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/affordable-health-insurance-for-the-unemployed/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/real-estate-loan-understanding-the-concept/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/how-to-find-a-low-interest-debt-consolidation-loan/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/how-to-obtain-a-debt-consolidation-home-loan/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/credit-card-debt-consolidation-loan/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/credit-card-debt/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/after-you-pay-off-credit-card-debt/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/car-title-loan/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/car-loan-refinancing/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/get-instant-cash-from-payday-loans/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/payday-loans-the-best-answer-when-you-are-caught-short/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/instant-approval-payday-loans-hassle-free-way-to-get-the-funds-you-need/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/bad-credit-payday-loans-why-you-can-borrow-cash-even-if-you-have-bad-credit/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/avoiding-payday-loans/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/emergency-help-payday-loans/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/guidelines-on-starting-a-payday-business-loan/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/online-payday-loans/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/the-mysterious-world-of-auto-leasing/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/accident-insurance-claim-personal-injury-insights/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/successful-real-estate-investor-tips/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/forex-has-the-advantage/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
    await chromeBrowserPage2.goto(
      "https://en.technoyippee.com/finding-freedom-from-all-that-debt-can-feel-impossible-find-out-what-you-can-do/",
      { waitUntil: "networkidle2" }
    );
    await chromeBrowserPage2.waitForTimeout(30000);
    await chromeBrowserPage2.evaluate(scrollToBottom);
  } catch (e) {
  } finally {
    setTimeout(function () {
      chromeBrowser.close();

      runAdsenseBot();
    }, 9000000);
  }
}

runAdsenseBot();

async function scrollToBottom() {
  await new Promise((resolve) => {
    const distance = 500; // should be less than or equal to window.innerHeight
    const delay = 500;
    const timer = setInterval(() => {
      document.scrollingElement.scrollBy(0, distance);
      if (
        document.scrollingElement.scrollTop + window.innerHeight >=
        document.scrollingElement.scrollHeight
      ) {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
}
