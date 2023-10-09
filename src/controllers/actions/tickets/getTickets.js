import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'list']

export const getTickets = function (category, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, category })

  eventsTable[tickets[action]] = callback
}
