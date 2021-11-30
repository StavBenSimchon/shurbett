require('dotenv').config()

const express = require('express')
const app = express()
const { PORT } = process.env

const Crawler = require('./spider/');

app.get('/results', async (req, res) => {
  const startTime = Date.now();
  console.log(startTime)
  // const result = await Crawler.startCrawlWinner()
  // const result = await Crawler.startCrawl10Bet()
  const result = await Crawler.startCrawlUnibet()
  const endTime = Date.now();

  console.log(`seconds elapsed = ${Math.floor((endTime - startTime) / 1000)}`);

  res.send(result)
})

app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`);
});
