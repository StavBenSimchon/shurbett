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
      console.log("START CRAWLING >>>>>>>>");
      const counterList = new Map()
      let winner = config['winner'].urls, i = 0
      for (i = 0; i < winner.length; i++) {
        console.log(`URL >>>> ${config['winner'].baseUrl}${winner[i]}`);
        await page.goto(`${config['winner'].baseUrl}${winner[i]}`, {
          waitUntil: 'networkidle2'
        })

        const count = await page.$$eval('.market_count > a', e=>e.map(a => a.href))
        console.log(`${i} >>>>>>> ${count}`);
        count.map(c => {
          let linkSplit = c.split('/')
          const key = linkSplit[linkSplit.length - 1]
          console.log(`LIST NUMBER ${i}`);
          console.log(`${key} >>>> ${c}`);
          counterList.set(key, c)
        })
      }
      console.log(counterList);
      return counterList
    }

    await page_counter_line_events()
    console.log("<<<<<<<<<<<<< CLOSING BROWSER >>>>>>>>>>>>>");
    await browser.close();
  } catch (error) {
    console.log('error - ', error);
  }
})();
