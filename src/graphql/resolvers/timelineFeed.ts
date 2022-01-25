import { Context } from '../..'
import {
  MutationCreateClubMembersFeedPostArgs,
  MutationDeleteClubMembersFeedPostArgs,
  QueryClubMembersFeedPostsArgs,
} from '../../generated/graphql'
import {
  createStreamClubMembersFeedActivity,
  deleteStreamClubMembersFeedActivity,
  getStreamClubMembersFeedActivities,
} from '../../lib/getStream'
import {
  checkUserIsMemberOfClub,
  checkUserIsOwnerOrAdminOfClub,
} from './club/utils'

//// Queries ////
// Calls Stream.io to get the activities and formats data into GQL types.
export const clubMembersFeedPosts = async (
  r: any,
  { clubId, limit, offset }: QueryClubMembersFeedPostsArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

  return getStreamClubMembersFeedActivities(clubId, limit, offset)
}

//// Mutations ////
export const createClubMembersFeedPost = async (
  r: any,
  { clubId, data }: MutationCreateClubMembersFeedPostArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)

  return createStreamClubMembersFeedActivity(clubId, authedUserId, data)
}

export const deleteClubMembersFeedPost = async (
  r: any,
  { activityId }: MutationDeleteClubMembersFeedPostArgs,
  { authedUserId, prisma }: Context,
) => {
  /// This method does a [checkUserIsOwnerOrAdminOfClub] check before deleting.
  /// It gets the club id via activity.club.id (via enrichment).
  /// Then check user is owner or admin of this club before deleting.
  return deleteStreamClubMembersFeedActivity(authedUserId, activityId, prisma)
}
