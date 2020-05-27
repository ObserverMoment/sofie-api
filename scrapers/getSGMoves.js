// https://app.sugarwod.com/developers-api-docs
// Get all the moves from SugarWOD api and save to local file
const fs = require('fs')
const fetch = require('node-fetch')
require('dotenv').config()

const baseUrl = 'https://api.sugarwod.com/v2/movements'

// Default is 25 moves per page.
const perPage = 25
async function getMovesPage (pageNumber) {
  const fetchPageUrl = `${baseUrl}?page[skip]=${pageNumber * perPage}`
  try {
    const res = await fetch(fetchPageUrl, {
      headers: {
        Authorization: process.env.SGWODKEY,
        'Content-type': 'application/json'
      }
    })
    const json = await res.json()
    return json.data
  } catch (err) {
    console.log(err)
  }
}

// https://dev.to/nirmal_kumar/retrieve-entire-data-from-paginated-api-recursively-3pl4
async function getAllMovesData (pageNumber = 0) {
  const moves = await getMovesPage(pageNumber)
  if (moves.length < 25) {
    // This is the last page of 25 moves.
    return moves
  } else {
    return moves.concat(await getAllMovesData(pageNumber + 1))
  }
}

async function saveToFile (allMoves) {
  const reqData = allMoves.map(m => ({
    name: m.attributes.name,
    scope: 'OFFICIAL'
  }))
  const formattedData = JSON.stringify(reqData, null, 2)

  fs.writeFile('./dataSets/sg_moves.json', formattedData, err => {
    if (err) throw err
    console.log('Data written to file')
  })

  return true
}

;(async () => {
  const allMoves = await getAllMovesData()
  console.log(allMoves.length)
  const saved = await saveToFile(allMoves)
  console.log(`Saved? ${saved}`)
})()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
