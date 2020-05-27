// Get all the moves from Wodwell homepage filters and save to file
const fs = require('fs')
const puppeteer = require('puppeteer')

const url = 'https://www.bodybuilding.com/exercises/finder/'

async function scrapeAllMovements () {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.click(
      '.bb-flat-btn.bb-flat-btn--size-lg.js-ex-loadMore.ExLoadMore-btn'
    )
    const movementNames = await page.$$eval(
      'h3.ExHeading.ExResult-resultsHeading > a',
      titles => titles.map(t => t.textContent.trim())
    )
    const movementMuscles = await page.$$eval(
      'div.ExResult-details.ExResult-muscleTargeted > a',
      muscleGroups => muscleGroups.map(mg => mg.textContent.trim())
    )
    const movementEquipments = await page.$$eval(
      'div.ExResult-details.ExResult-equipmentType > a',
      equipments => equipments.map(e => e.textContent.trim())
    )
    await browser.close()
    console.log('movementNames', movementNames)
    console.log('movementMuscles', movementMuscles)
    console.log('movementEquipments', movementEquipments)
    return movementNames.map((name, i) => ({
      name,
      muscleGroup: movementMuscles[i],
      equipment: movementEquipments[i]
    }))
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function saveToFile (allMoves) {
  const reqData = allMoves.map(move => ({
    ...move,
    scope: 'OFFICIAL'
  }))
  const formattedData = JSON.stringify(reqData, null, 2)

  fs.writeFile('./dataSets/bb_moves.json', formattedData, err => {
    if (err) throw err
    console.log('Data written to file')
  })

  return true
}

;(async () => {
  const movements = await scrapeAllMovements()
  console.log('movements', movements)
  const saved = await saveToFile(movements)
  console.log(`Saved? ${saved}`)
})()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
