const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

// Prisma client to connect to PG DB
const prisma = new PrismaClient({
  debug: true,
  log: ['info', 'query', 'warn'],
  errorFormat: 'pretty'
})

const createMoves = async moves => {
  console.log('creating moves')
  try {
    for await (const move of moves) {
      const { name, scope, equipments } = move
      console.log('Creating move', name)
      const connections = equipments.map(equipmentName => ({
        name: equipmentName
      }))
      console.log('Creating connections', connections)
      await prisma.move.create({
        data: {
          name,
          scope,
          availableEquipments: {
            connect: connections
          }
        }
      })
    }
    console.log('Finished creating')
  } catch (err) {
    console.log(err)
    process.exit(1)
  } finally {
    await prisma.disconnect()
  }
}

const seedData = async () => {
  // Get data from json file.
  const data = fs.readFileSync('./dataSets/wodwell_moves_mod_1.json')
  await createMoves(JSON.parse(data))
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  prisma.disconnect()
  return console.log(`About to exit with code ${code}`)
})
