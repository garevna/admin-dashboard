import { get } from '../AJAX'

const [route, action] = ['messages', 'partner']

const messagesRequestError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Partner\' messages',
  errorMessage: 'Failed to fetch messages from remote server'
}

export const getPartnerMessages = async resellerId => {
  let currentPage = 1
  const messages = []
  do {
    var { status, result } = await get(`messages?per_page=100&page=${currentPage++}`)

    if (status !== 200) self.postMessage(messagesRequestError)
    messages.push(...result.messages.filter(message => message.resellerId === resellerId))
  } while (result.page <= result.pages)

  return {
    status,
    route,
    action,
    result: messages
  }
}
