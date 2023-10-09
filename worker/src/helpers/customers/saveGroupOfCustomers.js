import { post, patch } from '../AJAX'
import { /* putRecordByKey */ putRecords } from '../db'
import { sendNotification } from '../updates'

const [route, action] = ['customers', 'save']

const logError = (data) => {
  const { index, response, group } = data
  let { error, message } = response.result
  error = error === 'Such a customer already exists.' ? 'duplicated' : error
  self.postDebugMessage('save-imported-customers', `Customer ${group[index].apartmentNumber}/${group[index].address}: ${error || message}`)
  return 1
}

export const saveGroupOfCustomers = async function (customers) {
  // const amount = customers.length
  const groups = customers
    .reduce(function (result) {
      result.push(this.splice(0, 100))
      return result
    }.bind(customers), [])

  let [done, ready, forbidden] = [false, true, false]
  const [remoteErrors, success, localErrors] = [[], [], []]

  while (!done && ready) {
    ready = false
    const group = groups.shift()
    const responses = await Promise.all(group.map(customer => post('customer', customer)))

    if (responses[0].status === 403) [forbidden, done, ready] = [true, true, false]
    else {
      responses.forEach((response, index) => response.status !== 200
        ? remoteErrors.push(logError({ index, response, group }))
        : Object.assign(group[index], { _id: response.result.data })
      )

      const saved = group.filter(customer => Boolean(customer._id))

      await Promise.all(saved.map(customer => patch(`customer/${customer._id}`, { resellerId: customer.resellerId })))

      const response = await putRecords('customers', saved)
      console.log('SAVING IMPORTED CUSTOMERS TO LOCAL DB. RESPONSE:\n', response)
      // localErrors.push(...response.map((item, index) => item.status !== 200 ? saved[index].uniqueCode : null).filter(item => !!item))

      success.push(...saved.map(customer => customer.uniqueCode))

      await Promise.all(saved.map(customer => sendNotification(customer.resellerId, 'customer', customer._id)))

      ready = true
      done = !groups.length
    }
  }

  // if (forbidden) return self.errorMessage('saveCustomerAccessError')
  // if (remoteErrors.length === amount) return self.errorMessage('saveCustomersRemoteServerError')

  const response = {
    status: 200,
    route,
    action,
    result: { success, remoteErrors, localErrors },
    message: true,
    messageType: 'Import customers',
    messageText: `Operation completed with ${remoteErrors.length} errors. ${success.length} customers saved.`
  }

  return forbidden
    ? Object.assign(response, { status: 403, messageText: 'Forbidden. You have no rights to perform this action.' })
    : response
}
