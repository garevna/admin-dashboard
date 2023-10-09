import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'get']

export const getTicketById = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id })

  eventsTable[tickets[action]] = callback
}
