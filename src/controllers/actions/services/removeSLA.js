import { eventsTable } from '@/controllers/events-table'
import { sla } from '@/controllers/events'

const [route, action] = ['sla', 'remove']

export const removeSLA = function (_id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, _id })

  eventsTable[sla[action]] = callback
}
