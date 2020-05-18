const { PrismaClient } = require('@prisma/client')

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

// Update this array before running.
const equipments = [
  { name: 'Bodyweight' },
  { name: 'Single Dumbell' },
  { name: 'Double Dumbell' },
  { name: 'Single Kettlebell' },
  { name: 'Double Kettlebell' },
  { name: 'Barbell' },
  { name: 'Weighted Vest' },
  { name: 'Sandbag' }
]

const createEquipments = async () => {
  // Prisma client to connect to PG DB
  const prisma = new PrismaClient({
    debug: true,
    log: ['info', 'query', 'warn'],
    errorFormat: 'pretty'
  })
  try {
    await parallel(equipments, async move => {
      return prisma.equipment.create({ data: { ...move } })
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  } finally {
    await prisma.disconnect()
  }
}

const seedData = async () => {
  console.log('seeding...')
  await createEquipments()
  console.log('created equipments')
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
