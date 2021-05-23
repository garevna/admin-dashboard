import { getRecordByKey } from '../db'
import { getCustomerDataError } from '../error-handlers'

export const getCustomer = async function (id) {
  const { status, result } = await getRecordByKey('customers', id)

  if (status !== 200) return getCustomerDataError(status)

  return { status, route: 'customers', action: 'get', key: id, result }
}
