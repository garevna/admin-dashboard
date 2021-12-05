import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'details']

export const getArchivedTicketDetails = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id })

  eventsTable[tickets[action]] = callback
}
