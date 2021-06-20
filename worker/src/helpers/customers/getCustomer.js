import { getRecordByKey } from '../db'

export const getCustomer = async function (customerId) {
  const [route, action] = ['customers', 'get']

  let { status, result: customer } = await getRecordByKey('customers', customerId)

  if (status !== 200) {
    const response = await self.refreshCustomer(customerId)
    status = response.status
    customer = response.result
  }

  return { status, route, action, key: customerId, result: customer }
}
