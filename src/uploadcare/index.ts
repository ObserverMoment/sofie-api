import fetch from 'node-fetch'
import crypto from 'crypto'
import {
  Workout,
  PrismaClient,
  LoggedWorkout,
  WorkoutArgs,
} from '@prisma/client'
import {
  ShallowUpdateWorkoutInput,
  DeepUpdateWorkoutInput,
  ShallowUpdateLoggedWorkoutInput,
  DeepUpdateLoggedWorkoutInput,
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
  console.log('deleteFiles')
  console.log('fileIds')
  console.log(fileIds)
  require('dotenv').config()
  const requestBody = JSON.stringify(fileIds)
  const res = await fetch(`${uploadcareApiUBaseUrl}/files/storage/`, {
    method: 'DELETE',
    body: requestBody,
    headers: prepareHeaders('DELETE', '/files/storage/', requestBody),
  })
  const json = await res.json()
  return json.status == 'ok'
}

/** Checks if there are any media (hosted) files being changed (if they are present then they will be changed - so don't send these fields if they have not changed) in the workouData
 * If there are then check if they can be removed (are they being shared with other workouts)
 * Then remove them if you can.
 */
export async function checkWorkoutMediaForDeletion(
  prisma: any,
  workoutData: ShallowUpdateWorkoutInput | DeepUpdateWorkoutInput,
) {
  console.log('checkWorkoutMediaForDeletion')
  console.log('workoutData')
  console.log(workoutData)
  if (
    workoutData.hasOwnProperty('imageUrl') ||
    workoutData.hasOwnProperty('demoVideoUrl')
  ) {
    // Handle deleting of now unused media from the host.
    const oldWorkout: Workout = await prisma.workout.findOne({
      where: {
        id: workoutData.id,
      },
    })
    if (
      workoutData.hasOwnProperty('imageUrl') &&
      workoutData.imageUrl != oldWorkout.imageUrl &&
      oldWorkout.imageUrl != null
    ) {
      console.log('checkThenDeleteWorkoutImageFile')
      await checkThenDeleteWorkoutImageFile(prisma, oldWorkout.imageUrl)
    }
    if (
      workoutData.hasOwnProperty('demoVideoUrl') &&
      workoutData.demoVideoUrl != oldWorkout.demoVideoUrl &&
      oldWorkout.demoVideoUrl != null
    ) {
      await checkThenDeleteWorkoutVideoFiles(
        prisma,
        oldWorkout.demoVideoUrl,
        oldWorkout.demoVideoThumbUrl,
      )
    }
  }
}

export async function checkThenDeleteWorkoutImageFile(
  prisma: PrismaClient,
  imageId: string | null | undefined,
) {
  if (imageId) {
    // Are the media files being used by other workouts that have been copied?
    // if they are, then do not delete them.
    const workoutsSharingImage: Workout[] = await prisma.workout.findMany({
      where: {
        imageUrl: imageId,
      },
    })

    if (workoutsSharingImage.length == 0) {
      // Then the image file is not shared so delete it from the server.
      await deleteFiles([imageId] as string[])
    }
  }
}

export async function checkThenDeleteWorkoutVideoFiles(
  prisma: PrismaClient,
  videoId: string | null | undefined,
  videoThumbId: string | null | undefined,
) {
  if (videoId) {
    const workoutsSharingVideo: Workout[] = await prisma.workout.findMany({
      where: {
        demoVideoUrl: videoId,
      },
    })

    if (workoutsSharingVideo.length == 0) {
      // Then the video files are not shared so delete the files from the server.
      await deleteFiles([videoId, videoThumbId] as string[])
    }
  }
}

/** Checks if there are any media (hosted) files being changed in the loggedWorkouData
 * If there are then check if they can be removed (are they being shared with other workouts)
 * Then remove them if you can.
 */
export async function checkLoggedWorkoutMediaForDeletion(
  prisma: any,
  loggedWorkoutData:
    | ShallowUpdateLoggedWorkoutInput
    | DeepUpdateLoggedWorkoutInput,
) {
  // Handle deleting of now unused media from the host.
  if (
    loggedWorkoutData.hasOwnProperty('imageUrl') ||
    loggedWorkoutData.hasOwnProperty('videoUrl')
  ) {
    const oldLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.findOne({
      where: {
        id: loggedWorkoutData.id,
      },
    })

    // LoggedWorkouts do not share media so you can go ahead with deleting the old files without checking.
    if (
      loggedWorkoutData.hasOwnProperty('imageUrl') &&
      loggedWorkoutData.imageUrl != oldLoggedWorkout.imageUrl &&
      oldLoggedWorkout.imageUrl != null
    ) {
      console.log('deleteFilesImageFile')
      await deleteFiles([oldLoggedWorkout.imageUrl] as string[])
    }
    if (
      loggedWorkoutData.hasOwnProperty('videoUrl') &&
      loggedWorkoutData.videoUrl != oldLoggedWorkout.videoUrl &&
      oldLoggedWorkout.videoUrl != null
    ) {
      console.log('deleteFilesvideoUrl')
      await deleteFiles([
        oldLoggedWorkout.videoUrl,
        oldLoggedWorkout.videoThumbUrl,
      ] as string[])
    }
  }
}
