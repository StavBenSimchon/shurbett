const Crawler = require('../crawler')

const MAX_TRIES = 5

module.exports = async () => {
  try {
    const crawler = new Crawler

    await crawler.initPuppeteer(250) // delay

    const page = await crawler.getPage()
    const config = crawler.configCrawler()

    async function startCrawl() {
      await goToPage(config['unibet'].urls_page[0])

      // TODO 
      // 
      await enterLinks()
      // await goToSideMenu()
      //
      // await showMoreCountries()
      //
      // await sideMenuListLevel2()
      // await page.waitForSelector('.rj-ev-list__ev-card.rj-ev-list__ev-card--upcoming.rj-ev-list__ev-card--regular');
      // const data = await pageGetLink();
      return
    }
    async function enterLinks(){
      await page.waitForSelector('._086a2')
      const selectors = await page.$x('//*[@id="rightPanel"]/div[3]/div/div/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[3]')
      // console.log(selectors)
      await selectors[0].click()
      console.log(">>>>aaaaa")
    }
    async function goToPage(link) {
      const URL = `${config['unibet'].baseUrl}${link}` 
      console.log(`URL >>>>>>>> ${URL} \n`)
      await crawler.crawlTo({url: URL, network: 'load'})
    }

    async function goAllLeaguesTab()  {
      console.log("goAllLeaguesTab >>>>>");
      await page.waitForSelector('#responsive-league-list-panel')

      await page.evaluate(() => {
        let tabs = document.querySelector('#responsive-league-list-panel > .tab-switch-responsive-block > .tab-switch-btns-holder > .tab-switch-btns')
        tabs.children[2].click()
      })
    }

    async function allLeaguesTable() {
      let selector = '.rj-league-list__item-holder'

      await page.waitForSelector(selector)

      let tableList = await page.$$(selector)

      let i
      for (i = 0; i < 1; i++) {
        let currentLeague = tableList[i]

        await currentLeague.evaluate(el => {
          el.firstElementChild.lastElementChild.click()
        })

        await leagueTable()
      }
    }

    async function leagueTable() {
      let selector = '.responsive-block.league-view-responsive-block > .events-container.events-container-league.league-events-block .rj-ev-list__content'

      await page.waitForSelector(selector)

      let games = await page.$$(selector)

      for (i = 0; i < 1; i++) {
        let currentGame = games[i]

        await currentGame.evaluate(el => {
          el.scrollIntoView()
          console.log(el);
          el.lastElementChild.firstElementChild.firstElementChild.firstElementChild.click()
        })

        // await leagueTable()
      }
    }

    // async function goToSideMenu(index = 0) {
    //   console.log("GO TO SIDEMENU >>>>>>>>");
    //   const selector = '.sports-list'
    //
    //   await page.waitForSelector(selector)
    //
    //   let list = await page.$(`${selector} > a${selector}-item`)
    //
    //   if(!list) {
    //     if(MAX_TRIES === index) return 0
    //
    //     return await goToSideMenu(index + 1)
    //   }
    //   await list.evaluate(el => el.scrollIntoView())
    // }

    // async function showMoreCountries(index = 0) {
    //   const showMore = await page.$('.sports-list-item.sports-list-sub-item.sports-list-show-more.show-events-btn-more')
    //   console.log("SHOW MORE >>>>>>>>");
    //   console.log(showMore);
    //   if(!showMore) {
    //     console.log("INDEX >>>", index);
    //     if(MAX_TRIES === index) {
    //       return 0
    //     }
    //     return await showMoreCountries(index + 1)
    //   }
    //   await showMore.click()
    // }

    // async function sideMenuListLevel2() {
    //   console.log("COUNTRY LEAGUES >>>>>>>>");
    //
    //   const currentLeague = await page.$$('.sports-list-country > a')
    //
    //   let i = 0
    //   // currentLeague.length
    //   for (i = 0; i < 1; i++) {
    //     const currentLink = currentLeague[i]
    //     currentLink.click()
    //     await goToSideMenu()
    //
    //     await sideMenuListLevel3()
    //   }
    //
    // }

    // async function sideMenuListLevel3() {
    //   const currentLeague = await page.$$('.sports-list-sub.sub-level-2 > div > a')
    //
    //   let i = 0
    //   // currentLeague.length
    //   for (i = 0; i < 1; i++) {
    //     const currentLink = currentLeague[i]
    //     console.log("currentLink", currentLink);
    //
    //     currentLink.click()
    //   }
    //
    // }

    console.log("<<<<<<<< START CRAWLING >>>>>>>> \n")

    const gamesTableRate = await startCrawl()

    console.log("<<<<<<<< END CRAWLING >>>>>>>> \n")

    console.log("<<<<<<<<<<<<< CLOSING BROWSER >>>>>>>>>>>>>")
    // await crawler.terminatePuppeteer()

    return gamesTableRate
  } catch (error) {
    console.log('error - ', error)
  }
}
