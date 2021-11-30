const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const config = require('../config.json');

class Crawler {

    constructor() {
      this.browser = null
      this.page = null
    }

    async initPuppeteer(delay = 0) {
      this.browser = await puppeteer.launch({
        headless: true,
        slowMo: delay,
        executablePath: '/usr/bin/chromium-browser', //- For DOCKER
        args: ['--no-sandbox', '--headless', '--disable-gpu'] //- For DOCKER
      })
      this.page = await this.browser.newPage()
    }

    async initCheerio() {
      const content = await this.page.content()

      return cheerio.load(content)
    }

    async crawlTo(crawl) {
      // [domcontentloaded, load, networkidle0, networkidle2]
      await this.page.goto(crawl.url, {
        waitUntil: crawl.network,
      })
    }

    async terminatePuppeteer() {
      await this.browser.close()
      this.browser = null
      this.page = null
    }

    getPage() {
      return this.page
    }

    configCrawler() {
      return config
    }

}

module.exports = Crawler
