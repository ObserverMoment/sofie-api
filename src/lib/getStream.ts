import { StreamChat } from 'stream-chat'

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
