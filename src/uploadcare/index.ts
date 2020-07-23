import fetch from 'node-fetch'
import crypto from 'crypto'

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

export async function deleteFiles(fileIds: string[]) {
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
