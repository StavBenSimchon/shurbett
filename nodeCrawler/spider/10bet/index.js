// module.exports = {
  await page.goto(config['10bet'].urls[0], {
    waitUntil: 'networkidle0'
  });
  await page.waitForSelector('.rj-ev-list__content')
  const test = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.events-container.events-container-league.league-events-block')).map(con => {
      if(con.offsetParent !== null) {
        var childrenElement = con.firstChild.firstChild.children
        // console.log(con)
        return Array.from(childrenElement).map(c => {
          var deepChildren = c.firstChild.lastChild.children
          console.log(deepChildren)
          return deepChildren
        })
      }
    })
  })

// }
