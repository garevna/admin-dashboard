import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'archived']

export const getArchivedTickets = function (year, month, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, year, month })

  eventsTable[tickets[action]] = callback
}
