import { getRecordByKey, putRecordByKey } from '../db'
import { put } from '../AJAX'

export const updateService = async function (id, data) {
  const [route, action] = ['services', 'put']

  const { status: getStatus, result: getResult } = await getRecordByKey('services', id)

  if (getStatus !== 200) return self.errorMessage('getServiceDetailsError')

  const response = Object.assign({}, getResult, data)

  const { status: putStatus } = await putRecordByKey('services', id, response)

  if (putStatus !== 200) return self.errorMessage('putServiceDetailsError')

  const { status, result } = await put(`service/${id}`, response)

  if (status !== 200) return self.errorMessage('putServiceDetailsError')

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
