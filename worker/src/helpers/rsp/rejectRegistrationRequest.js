import { remove } from '../AJAX'
import { deleteRecordByKey } from '../db'

const [route, action] = ['rsp', 'reject']

const message = {
  message: true,
  messageType: 'Leads request',
  messageText: 'Request was rejected'
}

export const rejectRegistrationRequest = async ({ id }) => {
  const { status } = await remove(`user/${id}`)

  // if (status !== 200) return Object.assign({ status, route, action }, self.errorMessage('rejectRequestError'))

  const response = await deleteRecordByKey('rsp', id)

  return Object.assign({ status, route, action }, response.status !== 200 ? self.errorMessage('rejectRequestError') : message)
}
