// Get all the equipments from Wodwell homepage filters and save to file
const fs = require('fs')
const puppeteer = require('puppeteer')

const url = 'https://wodwell.com/'

async function scrapeAllEquipments () {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const equipmentNames = await page.$$eval(
      '#equipment-incl > option',
      options => options.map(opt => opt.textContent.trim())
    )
    await browser.close()
    return equipmentNames
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function saveToFile (dataArray) {
  const reqData = dataArray.map(name => ({ name }))
  const jsonData = JSON.stringify(reqData, null, 2)

  fs.writeFile('./dataSets/wodwell_equipments.json', jsonData, err => {
    if (err) throw err
    console.log('Data written to file')
  })

  return true
}

;(async () => {
  const equipments = await scrapeAllEquipments()
  console.log('equipments', equipments)
  const saved = await saveToFile(equipments)
  console.log(`Saved? ${saved}`)
})()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
