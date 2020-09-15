const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })

module.exports = () => {
// https://www.10bet.com
  nightmare.goto('https://www.findair.co.uk')
    .evaluate(() => document.querySelector('#from').placeholder)
    .end()
    .then(console.log)
    .catch(error => {
      console.error('Search failed:', error)
    })
}
