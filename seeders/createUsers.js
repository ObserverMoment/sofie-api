const { PrismaClient, Gender } = require('@prisma/client')

function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

// Update this array before running.
const users = [
  {
    displayName: 'Beans',
    firstname: 'Richard',
    lastname: 'Beanland',
    email: 'bosonsoul@gmail.com',
    birthdate: new Date(1983, 12, 17).toISOString(),
    gender: Gender.MALE,
    height: 181,
    weight: 82,
    country: 'UK'
  },
  {
    displayName: 'BeastFromThe(Far)East',
    firstname: 'Jue',
    lastname: 'Hou',
    email: 'post2juehou@gmail.com',
    birthdate: new Date(1985, 25, 9).toISOString(),
    gender: Gender.FEMALE,
    height: 158,
    weight: 52,
    country: 'UK'
  }
]

const createUsers = async () => {
  // Prisma client to connect to PG DB
  const prisma = new PrismaClient({
    debug: true,
    log: ['info', 'query', 'warn'],
    errorFormat: 'pretty'
  })
  try {
    await parallel(users, async user => {
      return prisma.user.create({ data: { ...user } })
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
  await createUsers()
  console.log('created users')
  process.exit(0)
}

seedData()

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})
