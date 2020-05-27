// Get all the moves from Wodwell homepage filters and save to file
const fs = require('fs')
const puppeteer = require('puppeteer')

const url = 'https://wodwell.com/'

async function scrapeAllMovements () {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const movementNames = await page.$$eval(
      '#movement-incl > optgroup[label=Movements] > option',
      options => options.map(opt => opt.textContent.trim())
    )
    await browser.close()
    return movementNames
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function saveToFile (allMoves) {
  const reqData = allMoves.map(name => ({
    name,
    scope: 'OFFICIAL',
    equipments: ['None (bodyweight)']
  }))
  const formattedData = JSON.stringify(reqData, null, 2)

  fs.writeFile('./dataSets/wodwell_moves.json', formattedData, err => {
    if (err) throw err
    console.log('Data written to file')
  })

  return true
}

;(async () => {
  const movements = await scrapeAllMovements()
  console.log(movements)
  const saved = await saveToFile(movements)
  console.log(`Saved? ${saved}`)
})()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
