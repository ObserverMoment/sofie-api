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
      const { name, scope, requiredEquipments, selectableEquipments } = move
      if (!name || !scope || !requiredEquipments || !selectableEquipments) {
        throw Error(`Move: ${name} is missing some data`)
      }
      console.log('Creating move', name)
      console.log('Creating requiredEquipmentsConnections')
      const requiredEquipmentsConnections = requiredEquipments.map(equipmentName => ({
        name: equipmentName
      }))
      console.log('Creating selectableEquipmentsConnections')
      const selectableEquipmentsConnections = selectableEquipments.map(equipmentName => ({
        name: equipmentName
      }))
      await prisma.move.create({
        data: {
          name,
          scope,
          requiredEquipments: {
            connect: requiredEquipmentsConnections
          },
          selectableEquipments: {
            connect: selectableEquipmentsConnections
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
  const data = fs.readFileSync('./dataSets/wodwell_moves_mod_2.json')
  await createMoves(JSON.parse(data))
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  prisma.disconnect()
  return console.log(`About to exit with code ${code}`)
})
