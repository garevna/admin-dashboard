import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'put']

export const saveTicketData = (ticket, callback) => {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, ticket })

  eventsTable[tickets[action]] = callback
}
