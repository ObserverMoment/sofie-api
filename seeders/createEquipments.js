const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

// Prisma client to connect to PG DB
const prisma = new PrismaClient({
  debug: true,
  log: ['info', 'query', 'warn'],
  errorFormat: 'pretty'
})

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

const createEquipments = async dataArray => {
  console.log('creating equipments')
  try {
    await parallel(dataArray, async e => {
      return prisma.equipment.create({ data: { ...e } })
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  } finally {
    await prisma.disconnect()
  }
}

const seedData = async () => {
  // Get data from json file.
  const data = fs.readFileSync('./dataSets/wodwell_equipments_mod_1.json')
  await createEquipments(JSON.parse(data))
}

seedData()

process.on('exit', function (code) {
  prisma.disconnect()
  return console.log(`About to exit with code ${code}`)
})
