import { deleteRecordByKey } from '../db'
import { remove } from '../AJAX'

export const deleteCustomer = async function (id) {
  const [route, action] = ['customers', 'delete']

  const { status: localDBStatus } = await deleteRecordByKey('customers', id)

  if (localDBStatus !== 200) return self.errorMessage('deleteCustomerError')

  const { status } = await remove(`customer/${id}`)

  if (status !== 200) return self.errorMessage('deleteCustomerError')

  return {
    route,
    action,
    message: true,
    messageType: 'Customers',
    messageText: 'Customer removed'
  }
}
