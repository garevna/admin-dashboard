import { eventsTable } from '@/controllers/events-table'
import { messages } from '@/controllers/events'

const [route, action] = ['messages', 'update']

export const updateMessage = function (messageId, fields, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, messageId, fields })

  eventsTable[messages[action]] = callback
}
