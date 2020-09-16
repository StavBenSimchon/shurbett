const http = require('http')
const server = http.createServer();
const puppeteer = require('./spider/puppeter');

// const Spider = require('./spider/spider')

// console.log(Spider);
// Spider()
server.listen(8000);

console.log("Listen on port 8000");
