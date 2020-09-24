const winner = require('./winner')
const bet10 = require('./10bet')

module.exports = {
  startCrawlWinner: () => winner(),
  startCrawl10Bet: () => bet10()
}
