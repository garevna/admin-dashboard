import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

export const getResellersFromRemoteServer = async function () {
  const [route, action] = ['rsp', 'refresh']

  const { status, result } = await get('user')

  if (status !== 200) return self.errorMessage('refreshUsersError')

  clearStore('rsp')

  for (const user of result) {
    if (user.userInfo.role !== 'RSP') continue
    delete user.activeSesions
    if ((await putRecordByKey('rsp', user._id, user)).status !== 200) return self.errorMessage('putUserRecordError')
  }

  return { status: 200, route, action, result }
}
