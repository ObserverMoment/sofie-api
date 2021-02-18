// https://github.com/colinhacks/next-firebase-ssr/blob/master/firebaseAdmin.ts
import { AuthenticationError } from 'apollo-server'
import firebaseAdmin from 'firebase-admin'
import { ContextUserType } from '..'

// Setup firebase 'users' admin sdk
const usersPrivateKey = process.env['FIREBASE_USERS_PRIVATE_KEY']
const usersClientEmail = process.env['FIREBASE_USERS_CLIENT_EMAIL']
const usersProjectId = process.env['FIREBASE_USERS_PROJECT_ID']

if (!usersPrivateKey || !usersClientEmail || !usersProjectId) {
  console.log(
    'Failed to load Firebase credentials for users. Check environment variables are present',
  )
}

const usersFirebaseSDK = firebaseAdmin.initializeApp(
  {
    credential: firebaseAdmin.credential.cert({
      privateKey: usersPrivateKey,
      clientEmail: usersClientEmail,
      projectId: usersProjectId,
    }),
    databaseURL: `https://${usersProjectId}.firebaseio.com`,
  },
  'firebase_users',
)

// Setup firebase 'admins' admin sdk
const adminsPrivateKey = process.env['FIREBASE_ADMINS_PRIVATE_KEY']
const adminsClientEmail = process.env['FIREBASE_ADMINS_CLIENT_EMAIL']
const adminsProjectId = process.env['FIREBASE_ADMINS_PROJECT_ID']

if (!adminsPrivateKey || !adminsClientEmail || !adminsProjectId) {
  console.log(
    'Failed to load Firebase credentials for admins. Check environment variables are present',
  )
}

const adminsFirebaseSDK = firebaseAdmin.initializeApp(
  {
    credential: firebaseAdmin.credential.cert({
      privateKey: adminsPrivateKey,
      clientEmail: adminsClientEmail,
      projectId: adminsProjectId,
    }),
    databaseURL: `https://${adminsProjectId}.firebaseio.com`,
  },
  'firebase_admins',
)

const firebaseVerifyToken = async (
  authHeader: string,
  userType: ContextUserType,
): Promise<firebaseAdmin.auth.DecodedIdToken> => {
  try {
    return userType === 'ADMIN'
      ? await adminsFirebaseSDK.auth().verifyIdToken(authHeader, true)
      : await usersFirebaseSDK.auth().verifyIdToken(authHeader, true)
  } catch (err) {
    console.error(err)
    throw new AuthenticationError(err)
  }
}

export { usersFirebaseSDK, adminsFirebaseSDK, firebaseVerifyToken }
