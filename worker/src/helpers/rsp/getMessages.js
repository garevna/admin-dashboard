import { get } from '../AJAX'

const getMessagesError = {
  status: 500,
  route: 'rsp',
  action: 'get-messages',
  error: true,
  errorType: 'Messages to partner',
  errorMessage: 'Failed to fetch messages from remote server'
}

export const getMessages = async resellerId => {
  const { status, result } = await get('messages')
  if (status !== 200) return getMessagesError
  return {
    status,
    route: 'rsp',
    action: 'get-messages',
    result: result.messages.filter(message => message.resellerId === resellerId)
  }
}
