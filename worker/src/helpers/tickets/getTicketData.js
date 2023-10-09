import { getRecordByKey } from '../db'

export const getTicketData = async function (key) {
  const [route, action] = ['tickets', 'get']

  const { status, result: ticket } = await getRecordByKey(route, key)

  if (status !== 200) return self.errorMessage('getTicketDataError')

  const { resellerId, customerId } = ticket

  if (customerId) {
    const { status, result: customer } = await self.getCustomer(customerId)

    if (status !== 200) self.errorMessage('getCustomerDataError')

    const { uniqueCode, address, apartmentNumber } = customer
    Object.assign(ticket, { customer: { uniqueCode, address, apartmentNumber } })
  }

  const reseller = await self.getResellerDetails(resellerId)

  if (reseller.error) self.postMessage(reseller)
  else {
    const { name: resellerName } = reseller.result.company
    Object.assign(ticket, { resellerName })
  }

  // if (reseller.error) self.errorMessage('getUserDetailsError')

  return { status, route, action, result: ticket }
}
