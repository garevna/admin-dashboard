import { post, patch } from '../AJAX'
import { putRecordByKey } from '../db'
import { sendNotification } from '../updates'

const [route, action] = ['customers', 'save']

const error = {
  route,
  action,
  error: true,
  errorType: 'Import customers'
}

const remoteError = Object.assign({}, error, {
  status: 409,
  errorMessage: 'Operation failed. Duplicated customers were found.'
})

export const saveGroupOfCustomers = async function (customers) {
  let response = await Promise.all(customers.map(customer => post('customer', customer)))

  self.postDebugMessage({ operation: 'POST', response })

  const errors = []

  response.forEach((item, index) => item.status !== 200
    ? errors.push(index)
    : Object.assign(customers[index], { _id: item.result.data })
  )

  if (errors.length === customers.length) return remoteError
  if (errors.length) {
    self.postMessage(Object.assign({}, error, {
      status: 409,
      errorMessage: `Operation failed for ${errors.length} customers.`
    }))
  }

  const promises = customers
    .filter((customer, index) => !errors.includes(index))
    .map(customer => patch(`customer/${customer._id}`, { resellerId: customer.resellerId }))

  response = await Promise.all(promises)

  // self.postDebugMessage({ operation: 'PATCH', response })

  const result = response
    .filter(item => item.status === 200)
    .map(item => item.result.data)

  response = await Promise.all(result.map(customer => putRecordByKey('customers', customer._id, customer)))

  // self.postDebugMessage({ operation: 'putRecordByKey', response })

  response = await Promise.all(customers.map(customer => sendNotification(customer.resellerId, 'customer', customer._id)))

  // self.postDebugMessage({ action: 'sendNotification', response })

  return {
    status: 200,
    route,
    action,
    result,
    message: true,
    messageType: 'Import customers',
    messageText: `Operation completed with ${errors.length} errors`
  }
}
