// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    moves: async (r, a, { prisma }, i) => {
      const moves = await prisma.move.findMany()
      return moves
    }
  }
}

module.exports = resolvers
