import { eventsTable } from '@/controllers/events-table'
import { messages } from '@/controllers/events'

const [route, action] = ['messages', 'remove']

export const deleteMessage = function (messageId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, messageId })

  eventsTable[messages[action]] = callback
}
