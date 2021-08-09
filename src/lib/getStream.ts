import { prisma, PrismaClient } from '@prisma/client'
import { StreamChat } from 'stream-chat'
import { UpdateUserInput } from '../generated/graphql'
import { AccessScopeError } from '../graphql/utils'

export let streamChatClient: StreamChat | null = null

/// Call this when booting app.
export function initGetStreamClient() {
  try {
    if (!process.env.GETSTREAM_PUBLIC_KEY) {
      throw Error('Public key is undefined')
    }
    if (!process.env.GETSTREAM_PRIVATE_KEY) {
      throw Error('Private key is undefined')
    }

    streamChatClient = StreamChat.getInstance(
      process.env.GETSTREAM_PUBLIC_KEY as string,
      process.env.GETSTREAM_PRIVATE_KEY as string,
    )
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

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

export async function streamFieldsRequiringUpdate(
  prisma: PrismaClient,
  authedUserId: string,
  data: UpdateUserInput,
): Promise<string[]> {
  const oldUser = await prisma.user.findUnique({
    where: { id: authedUserId },
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

/// If the user updates their displayName or their avatarUri then we need to update the associated user on getStream. Their ID on getStream will match the ID is the database.
export async function updateGetStreamFields(
  authedUserId: string,
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
    id: authedUserId,
    set: {
      ...obj,
    },
  })
}

/**
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
