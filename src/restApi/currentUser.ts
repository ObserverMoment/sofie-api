import { PrismaClient } from '@prisma/client'
import { getUserChatToken, getUserFeedToken } from '../lib/getStream'
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
        console.log(
          'We could not find a user associated with this firebase Uid.',
        )
        res.status(400).json({
          error: 'We could not find a user associated with this firebase Uid.',
        })
      } else {
        // Get user tokens for Stream Chat and Stream Feeds.
        const streamChatToken = getUserChatToken(user.id)
        const streamFeedToken = getUserFeedToken(user.id)

        res.status(200).json({
          ...user,
          streamChatToken,
          streamFeedToken,
        })
      }
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
}
