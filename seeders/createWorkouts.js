const { PrismaClient, WorkoutType } = require('@prisma/client')

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

// Update this array before running.
const workouts = [
  {
    name: 'Grace',
    summary: '30 reps for time.',
    workoutType: WorkoutType.FORTIME
  },
  {
    name: 'Fran',
    summary: '21-15-9 reps for time.',
    workoutType: WorkoutType.FORTIME
  },
  {
    name: 'Mary',
    summary: 'AMRAP in 20 minutes.',
    workoutType: WorkoutType.AMRAP
  },
  {
    name: 'Cindy',
    summary: 'AMRAP in 20 minutes.',
    workoutType: WorkoutType.AMRAP
  },
  {
    name: 'Gwen',
    summary: '15-12-9 reps for load.',
    workoutType: WorkoutType.FORLOAD
  }
]

const createWorkouts = async () => {
  // Prisma client to connect to PG DB
  const prisma = new PrismaClient({
    debug: true,
    log: ['info', 'query', 'warn'],
    errorFormat: 'pretty'
  })
  try {
    await parallel(workouts, async workout => {
      return prisma.workout.create({ data: { ...workout } })
    })
  } catch (err) {
    prisma.disconnect()
    console.log(err)
    process.exit(1)
  } finally {
    await prisma.disconnect()
  }
}

const seedData = async () => {
  console.log('seeding...')
  await createWorkouts()
  console.log('created workouts')
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
