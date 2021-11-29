import { PrismaClient } from '.prisma/client'
import {
  createStreamChatUser,
  createStreamFeedUser,
  getUserChatToken,
  getUserFeedToken,
} from '../lib/getStream'
import validateToken from './validateToken'
import { Request, Response } from 'express'

export default async function (
  req: Request,
  res: Response,
  prisma: PrismaClient,
) {
  try {
    const decodedToken = await validateToken(req.headers.authorization, res)
    const displayName = req.body['name']

    if (displayName === undefined) {
      res.status(401).json({
        error: 'No display name provided. A unique display name is required.',
      })
    }

    if (!decodedToken || !decodedToken.uid) {
      res
        .status(401)
        .json({ error: 'The access token you provided was not valid.' })
    } else {
      // Check a user does not already have this firebase UID
      const oldUser = await prisma.user.findUnique({
        where: { firebaseUid: decodedToken.uid },
      })

      if (oldUser) {
        console.log('A user is already associated with this firebase Uid.')
        res.status(400).json({
          error: 'A user is already associated with this firebase Uid.',
        })
      } else {
        // Create a new user linkied to the new firebase ID
        const user = await prisma.user.create({
          data: {
            displayName,
            firebaseUid: decodedToken.uid,
          },
          select: {
            id: true,
            hasOnboarded: true,
          },
        })

        if (!user) {
          console.log(
            "Something went wrong that shouldn't have. We could not create a new user, sorry.",
          )
          res.status(500).json({
            error:
              "Something went wrong that shouldn't have. We could not create a new user, sorry.",
          })
        }

        // Create a new user for GetStreamChat services.
        await createStreamChatUser(user.id)

        // Get the user token associated with this new user.
        const streamChatToken = getUserChatToken(user.id)

        // Create a new user for GetStream Feeds services.
        await createStreamFeedUser(user.id)

        // Get the user token associated with this new user.
        const streamFeedToken = getUserFeedToken(user.id)

        res.json({
          ...user,
          streamChatToken,
          streamFeedToken,
        })
      }
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
