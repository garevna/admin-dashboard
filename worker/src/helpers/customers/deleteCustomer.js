import { deleteRecordByKey } from '../db'
import { remove } from '../AJAX'
const { deleteCustomerError } = require('../error-handlers').default

export const deleteCustomer = async function (id) {
  const [route, action] = ['customers', 'delete']

  const { status: localDBStatus } = await deleteRecordByKey('customers', id)

  if (localDBStatus !== 200) return deleteCustomerError(localDBStatus)

  const { status } = await remove(`customer/${id}`)

  if (status !== 200) return deleteCustomerError(status)

  return {
    route,
    action,
    message: true,
    messageType: 'Customers',
    messageText: 'Customer removed'
  }
}
