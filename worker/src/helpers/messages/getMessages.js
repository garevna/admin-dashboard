import { get } from '../AJAX'
import { messagesHandler } from '../../data-handlers'

const [route, action] = ['messages', 'get']

const messagesRequestError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Messages',
  errorMessage: 'Failed to fetch messages from remote server'
}

export const getMessages = async () => {
  let currentPage = 1
  const messages = []
  do {
    var { status, result } = await get(`messages?per_page=100&page=${currentPage++}`)

    if (status !== 200) self.postMessage(messagesRequestError)

    messages.push(...result.messages)
  } while (result.page <= result.pages)

  messagesHandler(messages)

  return {
    status,
    route,
    action,
    result: messages
  }
}
