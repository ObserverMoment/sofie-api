import { PrismaClient } from '.prisma/client'
import validateToken from './validateToken'

export default async function (req: any, res: any, prisma: PrismaClient) {
  try {
    const decodedToken = await validateToken(req.headers.authorization, res)

    if (!decodedToken || !decodedToken.uid) {
      res
        .status(401)
        .json({ error: 'The access token you provided was not valid.' })
    } else {
      // Check the user does not already have this firebase UID
      const oldUser = await prisma.user.findUnique({
        where: { firebaseUid: decodedToken.uid },
      })

      if (oldUser) {
        res.status(400).json({
          error: 'A user is already associated with this firebase Uid.',
        })
      } else {
        // Create an empty new user linkied to the new firebase ID
        const user = await prisma.user.create({
          data: {
            firebaseUid: decodedToken.uid,
          },
          select: {
            id: true,
            hasOnboarded: true,
          },
        })
        if (!user) {
          res.status(500).json({
            error:
              "Something went wrong that shouldn't have. We could not create a new user, sorry.",
          })
        }
        res.json(user)
      }
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
