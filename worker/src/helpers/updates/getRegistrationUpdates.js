import { get } from '../AJAX'
import { putRecordByKey } from '../db'

import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'registration']

const remoteError = Object.assign(remoteServerError, { route, action })

export const getRegistrationUpdates = async () => {
  const { status, result } = await get('registration?per_page=50')
  if (status !== 200) return remoteError

  const promises = result.map(user => putRecordByKey('rsp', user._id, user))
  await Promise.all(promises)

  return { status: 200, route, action, result }
}
