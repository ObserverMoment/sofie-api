const { PrismaClient } = require('@prisma/client')

// https://github.com/prisma/specs/pull/381/files#logging
const prisma = new PrismaClient({
  debug: true,
  log: ['info', 'query', 'warn'],
  errorFormat: 'pretty'
})

module.exports = prisma
