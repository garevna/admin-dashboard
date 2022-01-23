import { patch } from '../AJAX'

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

export const patchMessage = async (messageId, fields) => (await patch(`messages/${messageId}`, { fields })).status !== 200 ? updateMessageError : updateMessageResponse
