const { PrismaClient } = require('@prisma/client')

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

// Update this array before running.
const workoutMoves = [
  {
    workout: { connect: { name: 'Gwen' } },
    move: { connect: { name: 'Clean-and-Jerk' } }
  }
]

const createWorkoutMoves = async () => {
  // Prisma client to connect to PG DB
  const prisma = new PrismaClient({
    debug: true,
    log: ['info', 'query', 'warn'],
    errorFormat: 'pretty'
  })
  try {
    await parallel(workoutMoves, async workoutMove => {
      return prisma.workoutMove.create({ data: { ...workoutMove } })
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
  await createWorkoutMoves()
  console.log('created workoutMoves')
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
