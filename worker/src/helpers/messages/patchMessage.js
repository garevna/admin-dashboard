import { patch } from '../AJAX'
import { sendNotification } from '../updates'

const [route, action] = ['messages', 'update']

const updateMessageError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Message to partner',
  errorMessage: 'Failed to update message'
}

const updateMessageResponse = {
  status: 200,
  route,
  action,
  message: true,
  messageType: 'Message to partner',
  messageText: 'Message has been updated'
}

export const patchMessage = async (messageId, fields) => {
  if (!fields.length) return self.postMessage(await self.deleteMessage(messageId))

  const { status, result } = await patch(`messages/${messageId}`, { fields })

  const message = result.data

  if (status !== 200) return updateMessageError

  if (message.resellerId) await sendNotification(message.resellerId, 'message', messageId, fields.map(item => item.field))

  return updateMessageResponse
}
