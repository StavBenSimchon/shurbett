const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const config = require('../config.json');

module.exports = class Crawler {

    constructor() {
      this.browser = null
      this.page = null
    }

    async initPuppeteer() {
      this.browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser', //- For DOCKER
        args: ['--no-sandbox', '--headless', '--disable-gpu'] //- For DOCKER
      })
      this.page = await this.browser.newPage()
    }

    async initCheerio() {
      const content = await this.page.content()
      return cheerio.load(content)
    }

    async crawlTo(url) {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded' // 'networkidle2' - for SPA
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
