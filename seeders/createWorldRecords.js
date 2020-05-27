const { PrismaClient, RecordType, Gender } = require('@prisma/client')

// Prisma client to connect to PG DB
const prisma = new PrismaClient({
  debug: true,
  log: ['info', 'query', 'warn'],
  errorFormat: 'pretty'
})

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

// Update this array before running.
const worldRecords = [
  {
    recordValue: 175,
    recordType: RecordType.FORLOAD,
    gender: Gender.MALE,
    notes: 'No official record set',
    workout: {
      connect: { name: 'Gwen' }
    }
  },
  {
    recordValue: 125,
    recordType: RecordType.FORLOAD,
    gender: Gender.FEMALE,
    notes: 'No official record set',
    workout: {
      connect: { name: 'Gwen' }
    }
  }
]

const createWorldRecords = async () => {
  try {
    await parallel(worldRecords, async worldRecord => {
      return prisma.worldRecord.create({ data: { ...worldRecord } })
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
  await createWorldRecords()
  console.log('created worldRecords')
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  prisma.disconnect()
  return console.log(`About to exit with code ${code}`)
})
