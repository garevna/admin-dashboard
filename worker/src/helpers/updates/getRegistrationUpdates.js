import { get } from '../AJAX/get'
import { putRecordByKey } from '../db'

import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'registration']
const remoteError = Object.assign(remoteServerError, { route, action })

export const getRegistrationUpdates = async () => {
  if (Date.now() - self.lastRequestTime < self.frequency) return []

  const { status, result } = await get('registration?per_page=50')
  if (status !== 200) return remoteError

  // self.postDebugMessage({ registrationRequests: result })

  const promises = result.map(user => putRecordByKey('rsp', user._id, user))
  /* const response = */ await Promise.all(promises)

  // self.postDebugMessage({ registrationUpdates: response })

  self.lastRequestTime = Date.now()

  return { status: 200, route, action, result }
}
