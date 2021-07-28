import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import { uniqueCodes, uniqueCodeList } from '../data-handlers'

export const getResellersFromRemoteServer = async function () {
  const [route, action] = ['rsp', 'refresh']

  const { status, result } = await get('user')

  if (status !== 200) return self.errorMessage('refreshUsersError')

  clearStore('rsp')
  uniqueCodes([])

  const partners = result.filter(user => user.role === 'RSP')

  for (const rsp of partners) {
    if (rsp.approved) {
      uniqueCodeList(rsp._id, rsp.uniqueCode)
      uniqueCodes(rsp.uniqueCode)
    }
    if ((await putRecordByKey('rsp', rsp._id, rsp)).status !== 200) return self.errorMessage('putUserRecordError')
  }

  return { status: 200, route, action, result: partners }
}
