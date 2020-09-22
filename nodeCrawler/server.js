const http = require('http')
const server = http.createServer();
const axios = require('axios')
const cheerio = require('cheerio');
const config = require('./config.json');


// axios.get(`http://192.168.99.100:8050/render.html?url=https://www.winner.co.il/mainbook/sport-%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C/ep-%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%A0%D7%99%D7%9D-%D7%91%D7%99%D7%A0%D7%9C%D7%90%D7%95%D7%9E%D7%99%D7%99%D7%9D/ep-%D7%A1%D7%95%D7%A4%D7%A8-%D7%A7%D7%90%D7%A4-%D7%90%D7%99%D7%A8%D7%95%D7%A4%D7%90%D7%99&wait=10`)
//     .then(res => {
//           // for (var r in res) {
//           //   console.log(r);
//           // }
//           const $ = cheerio.load(res.data)
//
//           function page_counter_line_events() {
//             console.log("<<<<<<<< START CRAWLING >>>>>>>>");
//
//             const counterList = new Map()
//
//             let winner = config['winner'].urls, i = 0
//             for (i = 0; i < winner.length; i++) {
//               console.log(`URL >>>> ${config['winner'].baseUrl}${winner[i]}`);
//               await page.goto(`${config['winner'].baseUrl}${winner[i]}`, {
//                 waitUntil: 'networkidle2'
//               })
//
//               const count = await page.$$eval('.market_count > a', e=>e.map(a => a.href))
//               console.log(`${i} >>>>>>> ${count}`);
//               count.map(c => {
//                 let linkSplit = c.split('/')
//                 const key = linkSplit[linkSplit.length - 1]
//                 console.log(`LIST NUMBER ${i}`);
//                 console.log(`${key} >>>> ${c}`);
//                 counterList.set(key, c)
//               })
//             }
//             console.log(counterList);
//             return counterList
//           }
//
//     }).catch(ex => {
//       console.log(ex);
//     })
const puppeteer = require('./spider/puppeter');

// const Spider = require('./spider/spider')

// console.log(Spider);
// Spider()
server.listen(8000);

console.log("Listen on port 8000");
