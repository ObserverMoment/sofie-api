import fetch from 'node-fetch'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
import {
  UpdateWorkoutSectionInput,
  UpdateWorkoutPlanInput,
  UpdateMoveInput,
  UpdateWorkoutInput,
  UpdateUserBenchmarkEntryInput,
  UpdateClubSummaryInput,
  UpdateBodyTrackingEntryInput,
  UpdateUserProfileInput,
} from '../generated/graphql'
import { AccessScopeError } from '../graphql/utils'

const uploadcareApiUBaseUrl = 'https://api.uploadcare.com'
const cdnBaseUrl = 'https://ucarecdn.com/'

/// Gets a file Url in small size for avatar use.
export function getAvatarUrl(uid: string) {
  return `${cdnBaseUrl}${uid}/-/preview/400x400/`
}

/// Gets a file Url in small size for avatar use.
export function getFileUrl(uid: string) {
  return `${cdnBaseUrl}${uid}`
}

// https://github.com/RexMorgan/uploadcare-node/blob/master/lib/main.js
// https://uploadcare.com/docs/rest_api/requests_auth/
function prepareHeaders(verb: string, path: string, requestBody: any = '') {
  const contentType = 'application/json'

  // Hash private key
  const contentHash = crypto.createHash('md5').update(requestBody).digest('hex')

  const date = new Date().toUTCString()

  const signString = [verb, contentHash, contentType, date, path].join('\n')

  if (!process.env.UPLOADCARE_PUBLIC_KEY) {
    throw Error('Public key is undefined')
  }
  if (!process.env.UPLOADCARE_PRIVATE_KEY) {
    throw Error('Private key is undefined')
  }

  const signature = crypto
    .createHmac('sha1', process.env.UPLOADCARE_PRIVATE_KEY as string)
    .update(signString)
    .digest('hex')

  return {
    Authorization:
      'Uploadcare ' + process.env.UPLOADCARE_PUBLIC_KEY + ':' + signature,
    Date: date,
    Accept: 'application/vnd.uploadcare-v0.6+json',
    'Content-Type': 'application/json',
  }
}

export async function deleteFiles(fileIds: string[]): Promise<boolean> {
  const requestBody = JSON.stringify(fileIds)
  const res = await fetch(`${uploadcareApiUBaseUrl}/files/storage/`, {
    method: 'DELETE',
    headers: prepareHeaders('DELETE', '/files/storage/', requestBody),
    body: requestBody,
  })
  const json = await res.json()
  return (json as any).status == 'ok'
}

function getFileIdForDeleteOrNull(
  oldData: any,
  newData: any,
  key: string,
): string | null {
  return oldData[key] !== null &&
    newData.hasOwnProperty(key) &&
    newData[key] !== oldData[key]
    ? oldData[key]
    : null
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted once the update transaction is complete.
 */
export async function checkClubMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateClubSummaryInput,
): Promise<string[]> {
  // Get the old club data first.
  const oldClub = await prisma.club.findUnique({
    where: {
      id: data.id,
    },
    select: {
      introVideoUri: true,
      introVideoThumbUri: true,
      introAudioUri: true,
      coverImageUri: true,
    },
  })

  if (!oldClub) {
    throw new AccessScopeError(
      'checkClubMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldClub)
      .map((key: string) => getFileIdForDeleteOrNull(oldClub, data, key))
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkUserMediaForDeletion(
  prisma: PrismaClient,
  authedUserId: string,
  data: UpdateUserProfileInput,
): Promise<string[]> {
  // Get the original move media file info.
  // Then once update transaction is complete you can check to see if media should be deleted.
  const oldUser = await prisma.user.findUnique({
    where: {
      id: authedUserId,
    },
    select: {
      avatarUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  if (!oldUser) {
    throw new AccessScopeError(
      'checkUserMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldUser)
      .map((key: string) => getFileIdForDeleteOrNull(oldUser, data, key))
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkWorkoutMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateWorkoutInput,
): Promise<string[]> {
  // Get the old workout data first.
  const oldWorkout = await prisma.workout.findUnique({
    where: {
      id: data.id,
    },
    select: {
      coverImageUri: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  if (!oldWorkout) {
    throw new AccessScopeError(
      'checkWorkoutMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldWorkout)
      .map((key: string) => getFileIdForDeleteOrNull(oldWorkout, data, key))
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkWorkoutSectionMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateWorkoutSectionInput,
): Promise<string[]> {
  // Get the old workout section data first.
  const oldWorkoutSection = await prisma.workoutSection.findUnique({
    where: {
      id: data.id,
    },
    select: {
      introVideoUri: true,
      introVideoThumbUri: true,
      introAudioUri: true,
      classVideoUri: true,
      classVideoThumbUri: true,
      classAudioUri: true,
    },
  })

  if (!oldWorkoutSection) {
    throw new AccessScopeError(
      'checkWorkoutSectionMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldWorkoutSection)
      .map((key: string) =>
        getFileIdForDeleteOrNull(oldWorkoutSection, data, key),
      )
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed in the workoutPlanData
 * Returns an array of fileIds (strings) which should be deleted once the main transaction is successful.
 */
export async function checkWorkoutPlanMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateWorkoutPlanInput,
): Promise<string[]> {
  // Get the old workoutPlan data first.
  const oldWorkoutPlan = await prisma.workoutPlan.findUnique({
    where: {
      id: data.id,
    },
    select: {
      coverImageUri: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  if (!oldWorkoutPlan) {
    throw new AccessScopeError(
      'checkWorkoutPlanMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldWorkoutPlan)
      .map((key: string) => getFileIdForDeleteOrNull(oldWorkoutPlan, data, key))
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed in the updated move data
 * Returns an array of fileIds (strings) which should be deleted once the main transaction is successful.
 */
export async function checkMoveMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateMoveInput,
): Promise<string[]> {
  const oldMove = await prisma.move.findUnique({
    where: {
      id: data.id,
    },
    select: {
      demoVideoUri: true,
      demoVideoThumbUri: true,
    },
  })

  if (!oldMove) {
    throw new AccessScopeError(
      'checkMoveMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldMove)
      .map((key: string) => getFileIdForDeleteOrNull(oldMove, data, key))
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkUserBenchmarkEntryMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateUserBenchmarkEntryInput,
): Promise<string[]> {
  // Get the old data first.
  const oldBenchmarkEntry = await prisma.userBenchmarkEntry.findUnique({
    where: {
      id: data.id,
    },
    select: {
      videoUri: true,
      videoThumbUri: true,
    },
  })

  if (!oldBenchmarkEntry) {
    throw new AccessScopeError(
      'checkUserBenchmarkEntryMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = Object.keys(oldBenchmarkEntry)
      .map((key: string) =>
        getFileIdForDeleteOrNull(oldBenchmarkEntry, data, key),
      )
      .filter((x) => !!x) as string[]

    return fileIdsForDeletion
  }
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkBodyTrackingEntryMediaForDeletion(
  prisma: PrismaClient,
  data: UpdateBodyTrackingEntryInput,
): Promise<string[]> {
  // Get the old data first.
  const oldEntry = await prisma.bodyTrackingEntry.findUnique({
    where: {
      id: data.id,
    },
    select: {
      photoUris: true,
    },
  })

  if (!oldEntry) {
    throw new AccessScopeError(
      'checkBodyTrackingEntryMediaForDeletion: Unable to find object to check',
    )
  } else {
    const fileIdsForDeletion: string[] = oldEntry.photoUris.filter(
      (oldUri) => !data.photoUris?.includes(oldUri),
    )

    return fileIdsForDeletion
  }
}
