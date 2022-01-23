import { remove } from '../AJAX'

const [route, action] = ['messages', 'remove']

const deleteMessageError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Message to partner',
  errorMessage: 'Failed to remove message'
}

const deleteMessageResponse = {
  status: 200,
  route,
  action,
  message: true,
  messageType: 'Message to partner',
  messageText: 'Message has been removed'
}

export const deleteMessage = async messageId => (await remove(`messages/${messageId}`)).status !== 200 ? deleteMessageError : deleteMessageResponse
