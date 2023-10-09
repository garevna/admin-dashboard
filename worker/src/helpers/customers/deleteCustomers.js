import { getRecordByKey, deleteRecordByKey } from '../db'
import { remove } from '../AJAX'

const [route, action] = ['customers', 'delete-group']

export const deleteCustomers = async function (keys) {
  const amount = keys.length
  const groups = keys
    .reduce(function (result) { result.push(this.splice(0, 100)); return result }.bind(keys), [])

  let [done, ready, forbidden] = [false, true, false]
  const [remoteErrors, success, localErrors] = [[], [], []]

  while (!done && ready) {
    ready = false
    const group = groups.shift()
    const responses = await Promise.all(group.map(id => remove(`customer/${id}`)))

    console.log('DELETING RESULTS:\n', responses)

    if (responses[0].status === 403) [forbidden, done, ready] = [true, true, false]
    else {
      const serverErrors = responses
        .map((response, index) => response.status !== 200 ? group[index] : null)
        .filter(item => item)
      success.push(...responses.map((response, index) => response.status === 200 ? group[index] : null).filter(item => item))

      if (serverErrors.length) {
        const tmp = await Promise.all(serverErrors.map(id => getRecordByKey('customers', id)))
        console.log(tmp)
        remoteErrors.push(...tmp.map(response => response.status !== 200 ? response.result : response.result.uniqueCode))
      }

      if (success.length) {
        const customers = (await Promise.all(success.map(id => getRecordByKey('customers', id))))
          .map(response => response.status !== 200 ? response.result : response.result.uniqueCode)

        console.log('CUSTOMERS REMOVED FROM REMOTE:\n', customers)

        const results = await Promise.all(success.map(id => deleteRecordByKey('customers', id)))
        console.log('DELETING FROM LOCAL DB RESULTS:\n', results)
        localErrors.push(...results.map((item, index) => item.status !== 200 ? customers[index] : null).filter(item => item))
      }

      ready = true
      done = !groups.length
    }
  }

  console.group('DELETE GROUP OF CUSTOMERS')

  console.log('REMOTE ERRORS:\n', remoteErrors)
  console.log('SUCCESS:\n', success)
  console.log('LOCAL ERRORS:\n', localErrors)

  console.groupEnd('DELETE GROUP OF CUSTOMERS')

  if (forbidden) return self.errorMessage('deleteCustomerAccessError')
  if (remoteErrors.length === amount) return self.errorMessage('deleteCustomersRemoteServerError')

  return {
    status: 200,
    route,
    action,
    result: { success, remoteErrors, localErrors },
    message: true,
    messageType: 'Customers',
    messageText: 'Customers removed'
  }
}
