const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
console.log(nightmare);
module.exports = () => {
//
  nightmare.goto('https://findair.co.uk')
    .evaluate(() => document.querySelector('#from').placeholder)
    .end()
    .then(console.log)
    .catch(error => {
      console.error('Search failed:', error)
    })
}
