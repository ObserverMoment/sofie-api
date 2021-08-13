import { PrismaClient } from '@prisma/client'
import { StreamChat } from 'stream-chat'
import { connect, StreamClient } from 'getstream'
import { UpdateUserInput } from '../generated/graphql'
import { AccessScopeError } from '../graphql/utils'

export let streamFeedClient: StreamClient | null = null
export let streamChatClient: StreamChat | null = null

/// Call this when booting app. Sets up clients for chat and feeds.
export function initGetStreamClients() {
  try {
    if (!process.env.GETSTREAM_PUBLIC_KEY) {
      throw Error('GetStream public key is undefined')
    }
    if (!process.env.GETSTREAM_PRIVATE_KEY) {
      throw Error('GetStream private key is undefined')
    }

    streamFeedClient = connect(
      process.env.GETSTREAM_PUBLIC_KEY as string,
      process.env.GETSTREAM_PRIVATE_KEY as string,
    )

    streamChatClient = StreamChat.getInstance(
      process.env.GETSTREAM_PUBLIC_KEY as string,
      process.env.GETSTREAM_PRIVATE_KEY as string,
    )
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

//////////////////////
/////// Feeds ////////
//////////////////////
/**
 * Feed Types:
 * [user_feed] = users post to this feed. It gets followed by other users [timeline_feeds].
 * [user_timeline] = users view this feed. It follows other users [user_feeds].
 * [user_notifications] = notifications from the system.
 */
export async function createStreamFeedUser(userId: string) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    await streamFeedClient!.user(userId).create()
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

/**
 * For GetStream activity feeds - used on the client as an access token for the logged in user.
 * @param  {string} userId - the SpotMe database User ID.
 */
export function getUserFeedToken(userId: string): string {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    return streamFeedClient!.createUserToken(userId)
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

/// If the user updates their displayName or their avatarUri then we need to update the associated user on getStream feeds. Their ID on getStream will match the ID is the database.
export async function updateGetStreamFeedFields(
  userId: string,
  fieldsToUpdate: string[],
  data: any, // UpdateUserInput - cast as any so can index in by string.
) {
  if (!streamFeedClient) {
    throw Error('streamFeedClient not initialized')
  }

  const obj = fieldsToUpdate.reduce((acum, next) => {
    acum[next] = data[next]
    return acum
  }, {} as any)

  await streamFeedClient!.user(userId).update(obj)
}

//////////////////////
/////// Chat /////////
//////////////////////
export async function createStreamChatUser(userId: string) {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    await streamChatClient!.upsertUser({
      id: userId,
    })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

/// If the user updates their displayName or their avatarUri then we need to update the associated user on getStream chat. Their ID on getStream will match the ID is the database.
export async function updateGetStreamChatFields(
  userId: string,
  fieldsToUpdate: string[],
  data: any, // UpdateUserInput - cast as any so can index in by string.
) {
  if (!streamChatClient) {
    throw Error('streamChatClient not initialized')
  }

  const obj = fieldsToUpdate.reduce((acum, next) => {
    acum[next] = data[next]
    return acum
  }, {} as any)

  await streamChatClient!.partialUpdateUser({
    id: userId,
    set: {
      ...obj,
    },
  })
}

/**
 * For GetStream chat - used on the client as an access token for the logged in user.
 * @param  {string} userId - the SpotMe database User ID.
 */
export function getUserChatToken(userId: string): string {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    return streamChatClient!.createToken(userId)
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

////// Utils - For both Chat and Feeds ///////
export async function streamFieldsRequiringUpdate(
  prisma: PrismaClient,
  userId: string,
  data: UpdateUserInput,
): Promise<string[]> {
  const oldUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      displayName: true,
      avatarUri: true,
    },
  })

  if (!oldUser) {
    throw new AccessScopeError(
      'streamFieldsRequiringUpdate: Unable to find object to check',
    )
  } else {
    let fieldsRequiringUpdate = []

    if (
      data.hasOwnProperty('displayName') &&
      data['displayName'] !== oldUser.displayName
    ) {
      fieldsRequiringUpdate.push('displayName')
    }
    if (
      data.hasOwnProperty('avatarUri') &&
      data['avatarUri'] !== oldUser.avatarUri
    ) {
      fieldsRequiringUpdate.push('avatarUri')
    }

    return fieldsRequiringUpdate
  }
}
