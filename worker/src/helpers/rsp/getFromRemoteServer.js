import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import { refreshUsersError, putUserRecordError } from '../error-handlers'

export const getFromRemoteServer = async function () {
  const [route, action] = ['rsp', 'refresh']

  const { status, result } = await get('user')

  // self.postMessage({ status: 300, route, action, result: { status, result } })

  if (status !== 200) return refreshUsersError

  clearStore('rsp')

  for (const user of result) {
    // self.postMessage({ status: 300, route, action, result: { id: user._id, user } })
    if (user.userInfo.role !== 'RSP') continue
    if ((await putRecordByKey('rsp', user._id, user)).status !== 200) return putUserRecordError(status)
  }

  return { status: 200, route, action, result }
}
