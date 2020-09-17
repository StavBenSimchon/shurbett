const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log("1");
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--headless', '--disable-gpu']
    });
    const page = await browser.newPage();
    await page.goto('https://findair.co.uk', {
      waitUntil: 'networkidle2',
      timeout: 300000
    });
    await page.waitForSelector('.main', { timeout: 1000 });
    // console.log(browser);
    // console.log(page);

    const body = await page.evaluate(() => {
      console.log("@@@@@@@@@@@@@");
      return document.querySelector('#from').placeholder;
    });
    console.log(body);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
