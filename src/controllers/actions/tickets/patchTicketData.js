import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'patch']

export const patchTicketData = (key, history, callback) => {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key, history })

  eventsTable[tickets[action]] = callback
}
