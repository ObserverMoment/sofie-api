import fetch from 'node-fetch'
import crypto from 'crypto'
import { Workout, PrismaClient, LoggedWorkout } from '@prisma/client'
import {
  ShallowUpdateWorkoutInput,
  DeepUpdateWorkoutInput,
  ShallowUpdateLoggedWorkoutInput,
  DeepUpdateLoggedWorkoutInput,
  ShallowUpdateWorkoutProgramInput,
  DeepUpdateWorkoutProgramInput,
  WorkoutProgram,
} from '../generated/graphql'

const uploadcareApiUBaseUrl = 'https://api.uploadcare.com'

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
    body: requestBody,
    headers: prepareHeaders('DELETE', '/files/storage/', requestBody),
  })
  const json = await res.json()
  return json.status == 'ok'
}

/** Checks if there are any media (hosted) files being changed.
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkWorkoutMediaForDeletion(
  prisma: any,
  workoutData: ShallowUpdateWorkoutInput | DeepUpdateWorkoutInput,
): Promise<string[] | null> {
  // Get the old workout data first.
  const oldWorkout: Workout = await prisma.workout.findOne({
    where: {
      id: workoutData.id,
    },
  })
  const fileIdsForDeletion: string[] = []
  // If previous workout has media url (not null), and new workoutData has sent a media url, and the new media url and the old media url are different, then the old url should be deleted.
  if (
    oldWorkout.imageUrl != null &&
    workoutData.hasOwnProperty('imageUrl') &&
    workoutData.imageUrl != oldWorkout.imageUrl
  ) {
    fileIdsForDeletion.push(oldWorkout.imageUrl)
  }
  if (
    oldWorkout.demoVideoUrl != null &&
    workoutData.hasOwnProperty('demoVideoUrl') &&
    workoutData.demoVideoUrl != oldWorkout.demoVideoUrl
  ) {
    fileIdsForDeletion.push(oldWorkout.demoVideoUrl)
  }
  if (
    oldWorkout.demoVideoThumbUrl != null &&
    workoutData.hasOwnProperty('demoVideoThumbUrl') &&
    workoutData.demoVideoThumbUrl != oldWorkout.demoVideoThumbUrl
  ) {
    fileIdsForDeletion.push(oldWorkout.demoVideoThumbUrl)
  }
  return fileIdsForDeletion.length > 0 ? fileIdsForDeletion : null
}

/** Checks if there are any media (hosted) files being changed in the loggedWorkouData
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkLoggedWorkoutMediaForDeletion(
  prisma: any,
  loggedWorkoutData:
    | ShallowUpdateLoggedWorkoutInput
    | DeepUpdateLoggedWorkoutInput,
): Promise<string[] | null> {
  // Get the old loggedWorkout data first.
  const oldLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.findOne({
    where: {
      id: loggedWorkoutData.id,
    },
  })
  const fileIdsForDeletion: string[] = []
  // If previous workout has media url (not null), and new workoutData has sent a media url, and the new media url and the old media url are different, then the old url should be deleted.
  if (
    oldLoggedWorkout.imageUrl != null &&
    oldLoggedWorkout.hasOwnProperty('imageUrl') &&
    oldLoggedWorkout.imageUrl != oldLoggedWorkout.imageUrl
  ) {
    fileIdsForDeletion.push(oldLoggedWorkout.imageUrl)
  }
  if (
    oldLoggedWorkout.videoUrl != null &&
    oldLoggedWorkout.hasOwnProperty('videoUrl') &&
    oldLoggedWorkout.videoUrl != oldLoggedWorkout.videoUrl
  ) {
    fileIdsForDeletion.push(oldLoggedWorkout.videoUrl)
  }
  if (
    oldLoggedWorkout.videoThumbUrl != null &&
    oldLoggedWorkout.hasOwnProperty('videoThumbUrl') &&
    oldLoggedWorkout.videoThumbUrl != oldLoggedWorkout.videoThumbUrl
  ) {
    fileIdsForDeletion.push(oldLoggedWorkout.videoThumbUrl)
  }
  return fileIdsForDeletion.length > 0 ? fileIdsForDeletion : null
}

/** Checks if there are any media (hosted) files being changed in the workoutProgramData
 * Returns an array of fileIds (strings) which should be deleted.
 */
export async function checkWorkoutProgramMediaForDeletion(
  prisma: any,
  workoutProgramData:
    | ShallowUpdateWorkoutProgramInput
    | DeepUpdateWorkoutProgramInput,
): Promise<string[] | null> {
  // Get the old workoutProgram data first.
  const oldWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.findOne(
    {
      where: {
        id: workoutProgramData.id,
      },
    },
  )
  const fileIdsForDeletion: string[] = []
  // If previous workout has media url (not null), and new workoutData has sent a media url, and the new media url and the old media url are different, then the old url should be deleted.
  if (
    oldWorkoutProgram.imageUrl != null &&
    oldWorkoutProgram.hasOwnProperty('imageUrl') &&
    oldWorkoutProgram.imageUrl != oldWorkoutProgram.imageUrl
  ) {
    fileIdsForDeletion.push(oldWorkoutProgram.imageUrl)
  }
  if (
    oldWorkoutProgram.videoUrl != null &&
    oldWorkoutProgram.hasOwnProperty('videoUrl') &&
    oldWorkoutProgram.videoUrl != oldWorkoutProgram.videoUrl
  ) {
    fileIdsForDeletion.push(oldWorkoutProgram.videoUrl)
  }
  if (
    oldWorkoutProgram.videoThumbUrl != null &&
    oldWorkoutProgram.hasOwnProperty('videoThumbUrl') &&
    oldWorkoutProgram.videoThumbUrl != oldWorkoutProgram.videoThumbUrl
  ) {
    fileIdsForDeletion.push(oldWorkoutProgram.videoThumbUrl)
  }
  return fileIdsForDeletion.length > 0 ? fileIdsForDeletion : null
}
