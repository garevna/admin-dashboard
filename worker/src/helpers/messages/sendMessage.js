import { post } from '../AJAX'

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

export const sendMessage = async message => (await post('messages', message)).status !== 200 ? sendMessageError : sendMessageResponse
