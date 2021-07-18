import { putRecordByKey } from '../db'
import { patch } from '../AJAX'

const [route, action] = ['services', 'patch']

const message = {
  route,
  action,
  message: true,
  messageType: 'Service details',
  messageText: 'Service details were succesfully updated'
}

export const patchService = async function (id, data) {
  const { status, result } = await patch(`service/${id}`, data)

  if (status !== 200) return self.errorMessage('putServiceDetailsError')

  return Object.assign(await putRecordByKey('services', id, result.data), message)
}
