import { eventsTable } from '@/controllers/events-table'
import { messages } from '@/controllers/events'

const [route, action] = ['messages', 'partner']

export const getPartnerMessages = function (resellerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, resellerId })

  eventsTable[messages[action]] = callback
}
