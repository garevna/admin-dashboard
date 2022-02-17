import { post } from '../AJAX'
import { putRecordByKey } from '../db'
import { sendNotification } from '../updates'

const [route, action] = ['customers', 'save']

export const saveGroupOfCustomers = async function (customers) {
  const response = await Promise.all(customers.map(customer => post('customer', customer)))

  const result = response.map(item => item.result.data)

  customers.forEach((customer, index) => Object.assign(customer, { _id: result[index] }))

  // self.postDebugMessage({ customers })

  await Promise.all(customers.map(customer => putRecordByKey('customers', customer._id, customer)))

  await Promise.all(customers.map(customer => sendNotification(customer.resellerId, 'customer', customer._id)))

  // self.postDebugMessage({ notifications: await Promise.all(promises) })

  return {
    status: 200,
    route,
    action,
    result: customers,
    message: true,
    messageType: 'Import customers',
    messageText: 'Customers saved'
  }
}
