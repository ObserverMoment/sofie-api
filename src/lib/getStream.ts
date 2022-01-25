import { StreamChat } from 'stream-chat'
import {
  CollectionEntry,
  connect,
  EnrichedActivity,
  EnrichedUser,
  StreamClient,
} from 'getstream'
import { PrismaClient } from '@prisma/client'
import { checkUserIsOwnerOrAdminOfClub } from '../graphql/resolvers/club/utils'
import {
  CreateStreamFeedActivityInput,
  Maybe,
  StreamEnrichedActivity,
  StreamFeedClub,
  StreamFeedUser,
} from '../generated/graphql'

export let streamFeedClient: StreamClient | null = null
export let streamChatClient: StreamChat | null = null

const CLUB_MEMBERS_CHAT_CHANNEL_NAME = 'club_members'
// Club members feeds are private for club members only and CRUD for these is handled on the server to ensure data security.
const CLUB_MEMBERS_FEED_NAME = 'club_members_feed'

// Users post to their own feeds. Other users can follow these feeds via their timelines.
const USER_FEED_NAME = 'user_feed'
// Timelines follow feeds and they are what users view when they see their timleine.
const USER_TIMELINE_FEED_NAME = 'user_timeline'
const USER_NOTIFICATION_FEED_NAME = 'user_notification'

const CLUBS_COLLECTION_NAME = 'club'

type SetUserFields = {
  name?: string
  image?: string
}

type SetClubFields = {
  name?: string
  image?: string
}

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
    throw new Error(String(e))
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
 * [club_members_feed] = timelines of members can (optionally) follow this feed to get club related posts.
 */
/**
 * For GetStream activity feeds - used on the client as an access token for the logged in user.
 * @param  {string} userId - the database User ID.
 */
export function getUserFeedToken(userId: string): string {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    return streamFeedClient!.createUserToken(userId)
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function createStreamFeedUser(
  userId: string,
  displayName: string,
) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    await streamFeedClient!.user(userId).create({
      name: displayName,
    })
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function updateStreamFeedUser(
  userId: string,
  displayName?: string,
  avatarUri?: string,
) {
  try {
    if (!displayName && !avatarUri) return

    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }

    const update: SetUserFields = {}

    if (displayName) {
      update.name = displayName
    }
    if (avatarUri) {
      update.image = avatarUri
    }

    await streamFeedClient.user(userId).update(update)
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/// Saving basic club info to Stream servers so that we can display club name and avatar when club posts are being displayed in a user's feed.
/// Via the Stream [Collections] functionality.
/// https://getstream.io/activity-feeds/docs/node/collections_introduction/?language=javascript#updating-collections
export async function createStreamFeedClub(clubId: string, name: string) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    await streamFeedClient!.collections.add(CLUBS_COLLECTION_NAME, clubId, {
      name,
    })
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function updateStreamFeedClub(
  clubId: string,
  name?: string,
  coverImageUri?: string,
) {
  try {
    if (!name && !coverImageUri) return

    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }

    const update: SetUserFields = {}

    if (name) {
      update.name = name
    }
    if (coverImageUri) {
      update.image = coverImageUri
    }

    await streamFeedClient!.collections.update(
      CLUBS_COLLECTION_NAME,
      clubId,
      update,
    )
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

type FollowActionType = 'FOLLOW' | 'UNFOLLOW'

export async function toggleFollowClubMembersFeed(
  clubId: string,
  authedUserId: string,
  action: FollowActionType,
) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }

    const userTimeline = streamFeedClient.feed(
      USER_TIMELINE_FEED_NAME,
      authedUserId,
    )

    if (action == 'FOLLOW') {
      await userTimeline.follow(CLUB_MEMBERS_FEED_NAME, clubId)
    } else {
      await userTimeline.unfollow(CLUB_MEMBERS_FEED_NAME, clubId, {
        // Err on the side of caution re. club feed data as this is 'paid content'.
        keepHistory: false,
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function getStreamClubMembersFeedActivities(
  clubId: string,
  limit: number,
  offset: number,
): Promise<StreamEnrichedActivity[]> {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }

    const response = await streamFeedClient
      .feed(CLUB_MEMBERS_FEED_NAME, clubId)
      .get({
        limit: limit,
        offset: offset,
        enrich: true,
      })

    return response.results.map((r) =>
      formatStreamActivityData(r as EnrichedActivity),
    )
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function createStreamClubMembersFeedActivity(
  clubId: string,
  authedUserId: string,
  data: CreateStreamFeedActivityInput,
): Promise<StreamEnrichedActivity> {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    // Create the new activity.
    const activity = await streamFeedClient
      .feed(CLUB_MEMBERS_FEED_NAME, clubId)
      .addActivity({
        actor: `SU:${authedUserId}`,
        verb: 'club-post',
        object: data.object,
        ...data.extraData,
      })

    // Get the new activity enriched from stream server.
    const getActivitiesAPIResponse = await streamFeedClient.getActivities({
      ids: [activity.id],
      enrich: true,
    })

    return formatStreamActivityData(getActivitiesAPIResponse.results[0])
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function deleteStreamClubMembersFeedActivity(
  authedUserId: string,
  activityId: string,
  prisma: PrismaClient,
) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }

    const activity = (
      await streamFeedClient.getActivities({ ids: [activityId] })
    ).results[0]

    const clubId = (activity.club as CollectionEntry).id as string

    // Club ID should always be saved as the foreign_id of these posts.
    await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)

    const deleted = await streamFeedClient
      .feed(CLUB_MEMBERS_FEED_NAME, clubId)
      .removeActivity(activityId)

    if (!deleted.removed) {
      throw Error('There was a problem deleting this activity.')
    }

    return deleted.removed
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/// How many followers does their [user_feed] feed have.
export async function getUserFollowersCount(userId: string) {
  if (!streamFeedClient) {
    throw Error('streamFeedClient not initialized')
  }
  const stats = await streamFeedClient
    .feed(USER_FEED_NAME, userId)
    .followStats()

  return stats.results.followers.count
}

/// These methods convert an enriched activity returned from the stream servers into the graphql defined type that needs to be sent to the client.
/// The graphql types match the Dart types on the client so that the client can interact with this API and with the stream Flutter SDK in the same way.
function formatStreamActivityData(a: EnrichedActivity): StreamEnrichedActivity {
  return {
    id: a.id,
    actor: formatStreamUserObject(a.actor as EnrichedUser)!,
    verb: a.verb,
    object: a.object as string,
    time: new Date(a.time),
    extraData: {
      creator: a.creator
        ? formatStreamUserObject(a.creator as EnrichedUser)
        : null,
      club: a.club
        ? formatStreamCollectionObject(a.club as CollectionEntry)
        : null,
      title: a.title as string | undefined,
      caption: a.caption as string | undefined,
      tags: (a.tags as string[]) || [],
      audioUrl: a.audioUrl as string | undefined,
      imageUrl: a.imageUrl as string | undefined,
      videoUrl: a.videoUrl as string | undefined,
      originalPostId: a.originalPostId as string | undefined,
    },
  }
}

function formatStreamUserObject(u: EnrichedUser): StreamFeedUser | null {
  if (u.id && u.data) {
    return {
      id: u.id,
      data: {
        name: u.data.name as string | undefined,
        image: u.data.image as string | undefined,
      },
    }
  } else {
    return null
  }
}

function formatStreamCollectionObject(
  c: CollectionEntry,
): StreamFeedClub | null {
  if (c.id && c.data) {
    return {
      id: c.id,
      data: {
        name: c.data?.name as string | undefined,
        image: c.data?.image as string | undefined,
      },
    }
  } else {
    return null
  }
}

//////////////////////
/////// Chat /////////
//////////////////////
export async function upsertStreamChatUser(
  userId: string,
  displayName: string,
) {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    await streamChatClient!.upsertUser({
      id: userId,
      name: displayName,
    })
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

export async function updateStreamChatUser(
  userId: string,
  displayName?: string,
  avatarUri?: string,
) {
  try {
    if (!displayName && !avatarUri) return

    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }

    const set: SetUserFields = {}

    if (displayName) {
      set.name = displayName
    }
    if (avatarUri) {
      set.image = avatarUri
    }

    const update = {
      id: userId,
      set,
    }
    await streamChatClient.partialUpdateUser(update)
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/// Group chat for club members only - linked to the clubs ID.
/// GetStream channel type name is [club_members]
/// Run when a new club is created.
export async function createStreamClubMemberChat(
  clubId: string,
  creatorId: string,
) {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    // Create the new channel.
    await streamChatClient!
      .channel(CLUB_MEMBERS_CHAT_CHANNEL_NAME, clubId, {
        created_by_id: creatorId,
      })
      .create()
    // Add the creator to the channel.
    await streamChatClient!
      .channel(CLUB_MEMBERS_CHAT_CHANNEL_NAME, clubId)
      .addMembers([creatorId])
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/// Run when a club is deleted.
export async function deleteStreamClubMemberChat(clubId: string) {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    await streamChatClient!
      .channel(CLUB_MEMBERS_CHAT_CHANNEL_NAME, clubId)
      .delete()
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/// Run this when a new member joins.
export async function addStreamUserToClubMemberChat(
  clubId: string,
  userId: string,
) {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    await streamChatClient!
      .channel(CLUB_MEMBERS_CHAT_CHANNEL_NAME, clubId)
      .addMembers([userId])
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/// Run this when a member leaves.
export async function removeStreamUserFromClubMemberChat(
  clubId: string,
  userId: string,
) {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    await streamChatClient!
      .channel(CLUB_MEMBERS_CHAT_CHANNEL_NAME, clubId)
      .removeMembers([userId])
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}

/**
 * For GetStream chat - used on the client as an access token for the logged in user.
 * @param  {string} userId - the database User ID.
 */
export function getUserChatToken(userId: string): string {
  try {
    if (!streamChatClient) {
      throw Error('streamChatClient not initialized')
    }
    return streamChatClient!.createToken(userId)
  } catch (e) {
    console.log(e)
    throw new Error(String(e))
  }
}
