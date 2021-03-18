import { auth } from 'firebase-admin'
import { ContextUserType } from '..'
import { firebaseVerifyToken } from '../lib/firebaseAdmin'

export default async function (
  authHeader: string,
  res: any,
): Promise<auth.DecodedIdToken | undefined> {
  const authToken = authHeader ? authHeader.replace('Bearer ', '') : null

  if (!authToken) {
    res.status(401).json({
      error:
        'Please provide a valid access token against the header "authorization"',
    })
  } else {
    return firebaseVerifyToken(
      authToken,
      // Only USERs should ever use this endpoint - not ADMINs
      'USER' as ContextUserType,
    )
  }
}
