import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import { uniqueCodes, uniqueCodeList } from '../data-handlers'

const [route, action] = ['rsp', 'refresh']

export const getResellersFromRemoteServer = async function () {
  const { status, result } = await get('user/get_rsp?per_page=100')

  if (status !== 200) return self.errorMessage('refreshUsersError')

  clearStore('rsp')
  uniqueCodes([])

  await Promise.all(result.map(rsp => putRecordByKey('rsp', rsp._id, rsp)))

  const partners = result.filter(user => user.approved)

  for (const partner of partners) {
    uniqueCodeList(partner._id, partner.uniqueCode)
    uniqueCodes(partner.uniqueCode)
  }

  return { status: 200, route, action, result: partners }
}
