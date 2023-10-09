import { messagesHandler } from '../../data-handlers'

// import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'messages']

// const remoteError = Object.assign(remoteServerError, { route, action })

export const getMessagesUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  const updates = notifications.filter(item => item.target === 'message')

  if (updates) await self.getMessages()

  return { status: 200, route, action, result: messagesHandler() }
}
