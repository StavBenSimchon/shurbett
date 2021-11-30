const winner = require('./winner')
const bet10 = require('./10bet')
const unibet = require('./unibet')

module.exports = {
  startCrawlWinner: () => winner(),
  startCrawl10Bet: () => bet10(),
  startCrawlUnibet: () => unibet()
}
