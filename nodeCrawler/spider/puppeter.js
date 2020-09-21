// require('dotenv').config()

const puppeteer = require('puppeteer');
const config = require('../config.json');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--headless', '--disable-gpu']
    });
    const page = await browser.newPage();

    async function page_counter_line_events() {
      const counterList = new Map()
      let winner = config['winner'].urls, i = 0
      for (i = 0; i < 2; i++) {
        await page.goto(`${config['winner'].baseUrl}${winner[i]}`, {
          waitUntil: 'networkidle0'
        })

        const count = await page.$$eval('.market_count > a', e=>e.map(a => a.href))
        count.map(c => {
          let linkSplit = c.split('/')
          const key = linkSplit[linkSplit.length - 1]
          counterList.set(key, c)
        })
      }
      console.log(counterList);
      return counterList
    }

    await page_counter_line_events()

    await browser.close();
  } catch (error) {
    console.log('error - ', error);
  }
})();
