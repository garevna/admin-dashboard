import { deleteRecordByKey } from '../db'
import { remove } from '../AJAX'

const [route, action] = ['customers', 'delete']

export const deleteCustomer = async function (id) {
  const { status } = await remove(`customer/${id}`)

  if (status !== 200) return self.errorMessage(status === 403 || status === 401 ? 'deleteCustomerAccessError' : 'deleteCustomerRemoteServerError')

  const { status: localDBStatus } = await deleteRecordByKey('customers', id)

  if (localDBStatus !== 200) return self.errorMessage('deleteCustomerLocalError')

  return {
    status: 200,
    route,
    action,
    result: id,
    message: true,
    messageType: 'Customers',
    messageText: 'Customer removed'
  }
}
