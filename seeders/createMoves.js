const { PrismaClient } = require('@prisma/client')

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

// Update this array before running.
const moves = [
  { name: 'Clean-and-Jerk' },
  { name: 'Thruster' },
  { name: 'Pull-Up' },
  { name: 'Push-Up' },
  { name: 'Air Squat' },
  { name: 'Handstand Push-Up' },
  { name: 'Pistol' }
]

const createMoves = async () => {
  // Prisma client to connect to PG DB
  const prisma = new PrismaClient({
    debug: true,
    log: ['info', 'query', 'warn'],
    errorFormat: 'pretty'
  })
  try {
    await parallel(moves, async move => {
      return prisma.move.create({ data: { ...move } })
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
  await createMoves()
  console.log('created moves')
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
