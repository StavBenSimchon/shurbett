const CrawlerEngine = require('../crawler')

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

      await goToPage(`${config['winner'].urls_page}`)

      const totalPages = parseInt($('.total-pages').text().split(" ")[2])

      async function mapHrefLink() {
        // const counterLink = $('.market_count > a')
        //
        // counterLink.map((i, el) => {
        //   let href = $(el).attr('href')
        //   let linkSplit = href.split('/')
        //   const key = linkSplit[linkSplit.length - 1]
        //   pageLinksList.set(key, href)
        // })

        const count = await page.$$eval('.market_count > a', e => e.map(a => a.href))
        count.map(c => {
          let linkSplit = c.split('/')
          const key = linkSplit[linkSplit.length - 1]
          pageLinksList.set(key, c)
        })
      }

      let winner = config['winner'].urls_page, i = 0
      for (i = 0; i < totalPages; i++) {
        if(i === 0) {
          await mapHrefLink()
          continue
        }
        await goToPage(`${config['winner'].baseUrl}${config['winner'].urls_page}?page=${i+1}`)
        await mapHrefLink()
      }
      return pageLinksList
    }

    async function goToPage(link) {
      let URL = `${config['winner'].baseUrl}${link}`
      console.log(`URL >>>>>>>> ${URL} \n`)
      await crawler.crawlTo({url: URL, network: 'domcontentloaded'})

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
        // send game to db
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

        gameRate.push({ winner: { description, rate } })
      }
      return gameRate
    }

    function getAboveOrBelow(text) {
      let tempText = ''
      let hebOverText = 'מעל'
      let hebUnderText = 'מתחת'
      if(text.indexOf(hebOverText) !== -1) tempText = 'Over'
      if(text.indexOf(hebUnderText) !== -1) tempText = 'Under'

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
