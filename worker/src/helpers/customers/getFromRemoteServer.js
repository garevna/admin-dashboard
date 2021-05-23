import { get } from '../AJAX'
import { /* clearStore, */ putRecordByKey } from '../db'
import { refreshCustomersListError } from '../error-handlers'

import { getResellersList } from '../rsp'

import { getAllCustomers } from './'

export const getFromRemoteServer = async function () {
  const [route, action] = ['customers', 'refresh']

  const { status: rspStatus, result: resellers } = await getResellersList()

  // self.postMessage({ status: 300, route, action, result: { route: 'rsp', action: 'list', status: rspStatus, result: resellers } })

  if (rspStatus !== 200) return refreshCustomersListError(rspStatus)

  // clearStore('customers')

  for (const rsp of resellers) {
    if (rsp.userInfo.role !== 'RSP') continue
    const { status, result } = await get(`customer/admin/${rsp._id}`)
    // self.postMessage({ status: 300, rsp: rsp._id, customers: { status, result } })
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

  const { result: getResult } = await getAllCustomers()

  return { status: 200, route, action, result: getResult }
}
