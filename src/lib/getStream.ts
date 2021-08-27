import { StreamChat } from 'stream-chat'
import {
  connect,
  FlatActivity,
  FlatActivityEnriched,
  StreamClient,
} from 'getstream'
import {
  TimelinePostDataRequestInput,
  TimelinePostType,
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
const USER_NOTIFICATION_NAME = 'user_notification'

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
 * [club_members_feed] = timelines of members can (optionally) follow this feed to get club related posts.
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

/// Run this when you create a new club.
export async function createStreamClubMemberFeed(
  clubId: string,
  creatorId: string,
) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    // Create the new feed.
    await streamFeedClient.feed(CLUB_MEMBERS_FEED_NAME, clubId).addActivity({
      actor: `SU:${creatorId}`,
      object: 'Created',
      verb: 'club-post',
    })
  } catch (e) {
    console.log(e)
    throw new Error(e)
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
        // Err on the side of caution re. club feed data.
        keepHistory: false,
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export async function createStreamClubMembersFeedActivity(
  clubId: string,
  authedUserId: string,
  {
    object,
    caption,
    tags,
  }: { verb: string; object: string; caption?: string; tags: string[] },
) {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }
    // Create the new activity.
    return await streamFeedClient
      .feed(CLUB_MEMBERS_FEED_NAME, clubId)
      .addActivity({
        actor: `SU:${authedUserId}`,
        verb: 'club-post',
        object: object,
        caption: caption,
        tags: tags,
      })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

interface ActivityData {
  activityId: string
  postedAt: Date
  caption?: string
  tags: string[]
  dataRequestInput: TimelinePostDataRequestInput
}

export async function getStreamClubMembersFeedActivities(
  clubId: string,
  limit: number,
  offset: number,
): Promise<ActivityData[]> {
  try {
    if (!streamFeedClient) {
      throw Error('streamFeedClient not initialized')
    }

    // Create the new feed.
    const response = await streamFeedClient
      .feed(CLUB_MEMBERS_FEED_NAME, clubId)
      .get({
        limit: limit,
        offset: offset,
      })

    // Data from the activity that we want to extract as well as the ids of objects that we need to get from the database.
    // Note that [TimelinePostType] is a graphql schema enum and is therefore CAPITALIZED.
    // We should send already capitalized like [WORKOUT:6c35a392-19cd-4b13-bb7b-a45e643fc697]
    // This is an extra check...
    const activityData: ActivityData[] =
      // Should be a [FlatActivity[]] but we need to index into custom fields
      // So set as [any] for now.
      (response.results as any[]).map((a: any) => ({
        activityId: a.id,
        postedAt: new Date(a.time),
        caption: a['caption'],
        tags: a['tags'],
        dataRequestInput: {
          activityId: a.id,
          posterId: (a.actor as string).split(':')[1],
          objectId: (a.object as string).split(':')[1],
          objectType: (a.object as string)
            .split(':')[0]
            .toUpperCase() as TimelinePostType,
        },
      }))

    return activityData
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

////// NOTE: No longer syncing this data in GetStream. Request it from our own API when needed.
/// If the user updates their displayName or their avatarUri then we need to update the associated user on getStream feeds. Their ID on getStream will match the ID is the database.
// export async function updateGetStreamFeedFields(
//   userId: string,
//   fieldsToUpdate: string[],
//   data: any, // UpdateUserInput - cast as any so can index in by string.
// ) {
//   if (!streamFeedClient) {
//     throw Error('streamFeedClient not initialized')
//   }

//   const obj = fieldsToUpdate.reduce((acum, next) => {
//     acum[next] = data[next]
//     return acum
//   }, {} as any)

//   await streamFeedClient!.user(userId).update(obj)
// }

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
    throw new Error(e)
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
    throw new Error(e)
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
    throw new Error(e)
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
    throw new Error(e)
  }
}

////// NOTE: No longer syncing this data in GetStream. Request it from our own API when needed.
/// If the user updates their displayName or their avatarUri then we need to update the associated user on getStream chat. Their ID on getStream will match the ID is the database.
// export async function updateGetStreamChatFields(
//   userId: string,
//   fieldsToUpdate: string[],
//   data: any, // UpdateUserInput - cast as any so can index in by string.
// ) {
//   if (!streamChatClient) {
//     throw Error('streamChatClient not initialized')
//   }

//   const obj = fieldsToUpdate.reduce((acum, next) => {
//     acum[next] = data[next]
//     return acum
//   }, {} as any)

//   await streamChatClient!.partialUpdateUser({
//     id: userId,
//     set: {
//       ...obj,
//     },
//   })
// }

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

////// NOTE: No longer syncing this data in GetStream. Request it from our own API when needed.
////// Utils - For both Chat and Feeds ///////
// export async function streamFieldsRequiringUpdate(
//   prisma: PrismaClient,
//   userId: string,
//   data: UpdateUserInput,
// ): Promise<string[]> {
//   const oldUser = await prisma.user.findUnique({
//     where: { id: userId },
//     select: {
//       displayName: true,
//       avatarUri: true,
//     },
//   })

//   if (!oldUser) {
//     throw new AccessScopeError(
//       'streamFieldsRequiringUpdate: Unable to find object to check',
//     )
//   } else {
//     let fieldsRequiringUpdate = []

//     if (
//       data.hasOwnProperty('displayName') &&
//       data['displayName'] !== oldUser.displayName
//     ) {
//       fieldsRequiringUpdate.push('displayName')
//     }
//     if (
//       data.hasOwnProperty('avatarUri') &&
//       data['avatarUri'] !== oldUser.avatarUri
//     ) {
//       fieldsRequiringUpdate.push('avatarUri')
//     }

//     return fieldsRequiringUpdate
//   }
// }
