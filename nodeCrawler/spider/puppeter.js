const CrawlerEngine = require('./crawler')

module.exports = async () => {
  try {
    const crawler = new CrawlerEngine
    await crawler.initPuppeteer()

    const page = await crawler.getPage()
    const config = crawler.configCrawler()

    let $ = null

    async function startCrawl() {
      return await pageGames(await getPagesLink())
    }

    async function getPagesLink() {
      const pageLinksList = new Map()

      let winner = config['winner'].urls, i = 0
      for (i = 0; i < 1; i++) {
        await goToPage(winner[i])

        const count = await page.$$eval('.market_count > a', e => e.map(a => a.href))

        count.map(c => {
          let linkSplit = c.split('/')
          const key = linkSplit[linkSplit.length - 1]
          pageLinksList.set(key, c)
        })
      }
      return pageLinksList
    }

    async function goToPage(link) {
      let URL = `${config['winner'].baseUrl}${link}`
      console.log(`URL >>>>>>>> ${URL} \n`)
      await crawler.crawlTo(URL)

      $ = await crawler.initCheerio()
    }

    async function pageGames(links) {
      let games = []

      for (let link of links) {
        await goToPage(`line/${link[0]}`)

        let gamesContainer = $('.event-content').find('div.columns_2').parent()
        let game = pageGetGame(gamesContainer)

        game['gameName'] = $('.event-description').text().trim()
        games.push(game)
      }
      return games
    }

    function pageGetGame(elem) {
      let game = {}, i = 0
      for (i = 0; i < elem.length; i++) {
        let currentGame = elem[i]
        let gamesColumn = $(currentGame).find('div.columns_2 .pseudotable .title').parent()
        let gameRates = pageGamesRateAndDescription(gamesColumn)
        let gameTitle = $(currentGame).find('.market_type-title').text().trim()

        game[`game_${i}`] = { gameRates, gameTitle }
      }
      return game
    }

    function pageGamesRateAndDescription(elem) {
      let gameRate = [], j = 0
      for (j = 0; j < elem.length; j++) {
        let rate = $(elem[j]).find('.price').text()
        let descriptionText = $(elem[j]).find('.outcomedescription').text()
        let description = getAboveOrBelow(descriptionText)

        gameRate.push({ description, rate })
      }
      return gameRate
    }

    function getAboveOrBelow(text) {
      let tempText = ''
      let hebAboveText = 'מעל'
      let hebBelowText = 'מתחת'
      if(text.indexOf(hebAboveText) !== -1) tempText = 'above'
      if(text.indexOf(hebBelowText) !== -1) tempText = 'below'

      return tempText
    }

    console.log("<<<<<<<< START CRAWLING >>>>>>>> \n")

    const gamesTableRate = await startCrawl()

    console.log("<<<<<<<< END CRAWLING >>>>>>>> \n")

    // console.log(JSON.stringify(gamesTableRate, null, 4))
    console.log("<<<<<<<<<<<<< CLOSING BROWSER >>>>>>>>>>>>>")
    await crawler.terminatePuppeteer()

    return gamesTableRate
  } catch (error) {
    console.log('error - ', error)
  }
}
