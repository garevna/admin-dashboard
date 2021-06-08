import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

const { refreshUsersError, putUserRecordError } = require('../error-handlers').default

export const getResellersFromRemoteServer = async function () {
  const [route, action] = ['rsp', 'refresh']

  const { status, result } = await get('user')

  if (status !== 200) return refreshUsersError(status)

  clearStore('rsp')

  for (const user of result) {
    if (user.userInfo.role !== 'RSP') continue
    delete user.activeSessions
    if ((await putRecordByKey('rsp', user._id, user)).status !== 200) return putUserRecordError(status)
  }

  return { status: 200, route, action, result }
}
