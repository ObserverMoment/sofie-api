import { PrismaClient } from '.prisma/client'
import { Request, Response } from 'express'
import { displayNameIsAvailable } from '../graphql/resolvers/user'

export default async function (
  req: Request,
  res: Response,
  prisma: PrismaClient,
) {
  try {
    const name: string | undefined = req.query['name'] as string

    if (name === undefined || name === null) {
      console.error('Required query parameter [name] was not provided.')
      res
        .status(401)
        .json({ error: 'Please provide the query parameter [name].' })
    } else {
      const isAvailable = await displayNameIsAvailable(name, prisma)

      res.json({
        isAvailable: isAvailable,
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
