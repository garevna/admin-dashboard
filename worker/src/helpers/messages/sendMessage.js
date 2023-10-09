import { post } from '../AJAX'
import { sendNotification } from '../updates'

const [route, action] = ['messages', 'send']

const sendMessageError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Message to partner',
  errorMessage: 'Failed to send message'
}

const sendMessageResponse = {
  status: 200,
  route,
  action,
  message: true,
  messageType: 'Message to partner',
  messageText: 'Message has been transmitted'
}

export const sendMessage = async message => {
  const { status, result } = await post('messages', message)

  if (message.resellerId) await sendNotification(message.resellerId, 'message', message._id, message.fields.map(item => item.field))

  return status !== 200 ? sendMessageError : Object.assign(sendMessageResponse, { result })
}
