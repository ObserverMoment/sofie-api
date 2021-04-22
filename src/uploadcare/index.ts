import fetch from 'node-fetch'
import crypto from 'crypto'
import { Workout, LoggedWorkout, User, WorkoutSection } from '@prisma/client'
import {
  WorkoutProgram,
  Move,
  UpdateUserInput,
  UpdateWorkoutSectionInput,
  UpdateLoggedWorkoutInput,
  UpdateWorkoutProgramInput,
  UpdateMoveInput,
  UpdateWorkoutInput,
} from '../generated/graphql'

const uploadcareApiUBaseUri = 'https://api.uploadcare.com'

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
  const res = await fetch(`${uploadcareApiUBaseUri}/files/storage/`, {
    method: 'DELETE',
    headers: prepareHeaders('DELETE', '/files/storage/', requestBody),
    body: requestBody,
  })
  const json = await res.json()
  return json.status == 'ok'
}

function getFileIdForDeleteOrNull(
  oldData: any,
  newData: any,
  key: string,
): string | null {
  return oldData[key] != null &&
    newData.hasOwnProperty(key) &&
    newData[key] !== oldData[key]
    ? oldData[key]
    : null
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkUserMediaForDeletion(
  prisma: any,
  authedUserId: string,
  data: UpdateUserInput,
): Promise<string[]> {
  // Get the original move media file info.
  // Then once update transaction is complete you can check to see if media should be deleted.
  const oldUser: User = await prisma.user.findUnique({
    where: {
      id: authedUserId,
    },
    select: {
      avatarUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  const fileIdsForDeletion: string[] = Object.keys(oldUser)
    .map((key: string) => getFileIdForDeleteOrNull(oldUser, data, key))
    .filter((x) => !!x) as string[]

  return fileIdsForDeletion
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkWorkoutMediaForDeletion(
  prisma: any,
  data: UpdateWorkoutInput,
): Promise<string[]> {
  // Get the old workout data first.
  const oldWorkout: Workout = await prisma.workout.findUnique({
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

  const fileIdsForDeletion: string[] = Object.keys(oldWorkout)
    .map((key: string) => getFileIdForDeleteOrNull(oldWorkout, data, key))
    .filter((x) => !!x) as string[]

  return fileIdsForDeletion
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkWorkoutSectionMediaForDeletion(
  prisma: any,
  data: UpdateWorkoutSectionInput,
): Promise<string[]> {
  // Get the old workout section data first.
  const oldWorkoutSection: WorkoutSection = await prisma.workoutSection.findUnique(
    {
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
        outroVideoUri: true,
        outroVideoThumbUri: true,
        outroAudioUri: true,
      },
    },
  )

  const fileIdsForDeletion: string[] = Object.keys(oldWorkoutSection)
    .map((key: string) =>
      getFileIdForDeleteOrNull(oldWorkoutSection, data, key),
    )
    .filter((x) => !!x) as string[]

  return fileIdsForDeletion
}

/** Checks if there are any media (hosted) files being changed in the loggedWorkouData
 * Returns an array of fileIds (strings) which should be deleted once the main transaction is successful.
 */
export async function checkLoggedWorkoutMediaForDeletion(
  prisma: any,
  data: UpdateLoggedWorkoutInput,
): Promise<string[]> {
  // Get the old loggedWorkout data first.
  const oldLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.findUnique(
    {
      where: {
        id: data.id,
      },
      select: {
        imageUri: true,
        videoUri: true,
        videoThumbUri: true,
      },
    },
  )

  const fileIdsForDeletion: string[] = Object.keys(oldLoggedWorkout)
    .map((key: string) => getFileIdForDeleteOrNull(oldLoggedWorkout, data, key))
    .filter((x) => !!x) as string[]

  return fileIdsForDeletion
}

/** Checks if there are any media (hosted) files being changed in the workoutProgramData
 * Returns an array of fileIds (strings) which should be deleted once the main transaction is successful.
 */
export async function checkWorkoutProgramMediaForDeletion(
  prisma: any,
  data: UpdateWorkoutProgramInput,
): Promise<string[]> {
  // Get the old workoutProgram data first.
  const oldWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.findUnique(
    {
      where: {
        id: data.id,
      },
      select: {
        coverImageUri: true,
        introAudioUri: true,
        introVideoUri: true,
        introVideoThumbUri: true,
      },
    },
  )

  const fileIdsForDeletion: string[] = Object.keys(oldWorkoutProgram)
    .map((key: string) =>
      getFileIdForDeleteOrNull(oldWorkoutProgram, data, key),
    )
    .filter((x) => !!x) as string[]

  return fileIdsForDeletion
}

/** Checks if there are any media (hosted) files being changed in the updated move data
 * Returns an array of fileIds (strings) which should be deleted once the main transaction is successful.
 */
export async function checkMoveMediaForDeletion(
  prisma: any,
  data: UpdateMoveInput,
): Promise<string[]> {
  const oldMove: Move = await prisma.move.findUnique({
    where: {
      id: data.id,
    },
    select: {
      demoVideoUri: true,
      demoVideoThumbUri: true,
    },
  })

  const fileIdsForDeletion: string[] = Object.keys(oldMove)
    .map((key: string) => getFileIdForDeleteOrNull(oldMove, data, key))
    .filter((x) => !!x) as string[]

  return fileIdsForDeletion
}
