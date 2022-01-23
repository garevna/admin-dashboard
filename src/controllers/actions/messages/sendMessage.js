import { eventsTable } from '@/controllers/events-table'
import { messages } from '@/controllers/events'

const [route, action] = ['messages', 'send']

export const sendMessage = function (message, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, message })

  eventsTable[messages[action]] = callback
}
