import { get } from '../AJAX'

const [route, action] = ['tickets', 'details']

export const getArchivedTicketDetails = async function (key) {
  const { status, result: ticket } = await get(`ticket/${key}`)

  if (status !== 200) return self.errorMessage('getTicketDataError')

  const { resellerId, customerId } = ticket

  if (customerId) {
    const { status, result: customer } = await self.getCustomer(customerId)

    if (status !== 200) self.errorMessage('getCustomerDataError')

    const { uniqueCode, address, apartmentNumber } = customer
    Object.assign(ticket, { customer: { uniqueCode, address, apartmentNumber } })
  }

  const reseller = await self.getResellerDetails(resellerId)

  if (reseller.status !== 200) self.errorMessage('getUserDetailsError')

  const { name: resellerName } = reseller.result.company

  Object.assign(ticket, { resellerName })

  return { status, route, action, result: ticket }
}
