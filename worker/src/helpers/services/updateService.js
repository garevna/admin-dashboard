import { getRecordByKey, putRecordByKey } from '../db'
import { put } from '../AJAX'
import { getServiceDetailsError, putServiceDetailsError } from '../error-handlers'

export const updateService = async function (id, data) {
  const [route, action] = ['services', 'put']

  const { status: getStatus, result: getResult } = await getRecordByKey('services', id)

  if (getStatus !== 200) return getServiceDetailsError(getStatus)

  const response = Object.assign({}, getResult, data)

  self.postMessage({ status: 300, route, action, result: response })

  const { status: putStatus } = await putRecordByKey('services', id, response)

  if (putStatus !== 200) return putServiceDetailsError(putStatus)

  const { status, result } = await put(`service/${id}`, response)

  self.postMessage({ status: 300, route, action, result })

  if (status !== 200) return putServiceDetailsError(status)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Service details',
    messageText: 'Service details were succesfully updated'
  }
}
