import { getRecordByKey } from '../db'
const {
  getTicketDataError,
  getUserDetailsError,
  getCustomerDataError
} = require('../error-handlers').default

export const getTicketData = async function (key) {
  const [route, action] = ['tickets', 'get']

  // self.postMessage({ status: 300, route, action, key })

  const { status, result: ticket } = await getRecordByKey(route, key)

  if (status !== 200) return getTicketDataError(status)

  const { resellerId, customerId } = ticket

  if (customerId) {
    const { status, result: customer } = await self.getCustomer(customerId)

    if (status !== 200) getCustomerDataError(status)

    const { uniqueCode, address, apartmentNumber } = customer
    Object.assign(ticket, { customer: { uniqueCode, address, apartmentNumber } })
  }

  const reseller = await self.getResellerDetails(resellerId)

  if (reseller.status !== 200) getUserDetailsError(reseller.status)

  const { name: resellerName } = reseller.result.company

  Object.assign(ticket, { resellerName })

  return { status, route, action, result: ticket }
}
