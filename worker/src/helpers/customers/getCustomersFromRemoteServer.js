import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

const { refreshCustomersListError } = require('../error-handlers').default

export const getCustomersFromRemoteServer = async function () {
  const [route, action] = ['customers', 'refresh']

  const { status, result: resellers } = await self.getResellersList()

  if (status !== 200) return refreshCustomersListError(status)

  clearStore('customers')

  for (const rsp of resellers) {
    if (rsp.userInfo.role !== 'RSP') continue
    const { status, result } = await get(`customer/admin/${rsp._id}`)

    if (status !== 200 || !result) {
      self.postMessage(refreshCustomersListError(status))
      continue
    }
    for (const customer of result) {
      const { _id } = customer
      const { status } = await putRecordByKey('customers', _id, customer)
      if (status !== 200) refreshCustomersListError(status)
    }
  }

  return { status: 200, route, action }
}
