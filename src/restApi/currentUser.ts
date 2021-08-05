import { PrismaClient } from '@prisma/client'
import { getUserChatToken } from '../lib/getStream'
import validateToken from './validateToken'

export default async function (req: any, res: any, prisma: PrismaClient) {
  try {
    const decodedToken = await validateToken(req.headers.authorization, res)

    if (!decodedToken || !decodedToken.uid) {
      res
        .status(401)
        .json({ error: 'The access token you provided was not valid.' })
    } else {
      // Check that a User exists for the authed firebase Uid.
      const user = await prisma.user.findUnique({
        where: { firebaseUid: decodedToken.uid },
        select: {
          id: true,
          hasOnboarded: true,
        },
      })

      if (!user) {
        res.status(400).json({
          error: 'We could not find a user associated with this firebase Uid.',
        })
      } else {
        // Get the user token associated with this new user.
        const streamChatToken = getUserChatToken(user.id)

        res.status(200).json({
          ...user,
          streamChatToken,
        })
      }
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
}
