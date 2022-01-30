import { remove } from '../AJAX'
import { sendNotification } from '../updates'

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
  result: null,
  message: true,
  messageType: 'Message to partner',
  messageText: 'Message has been removed'
}

export const deleteMessage = async (messageId, resellerId) => {
  const response = await remove(`messages/${messageId}`)

  if (resellerId) await sendNotification(resellerId, 'message', messageId)

  return response.status !== 200 ? deleteMessageError : deleteMessageResponse
}
