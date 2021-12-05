import { eventsTable } from '@/controllers/events-table'
import { sla } from '@/controllers/events'

const [route, action] = ['sla', 'get']

export const getSLAContent = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id })

  eventsTable[sla[action]] = callback
}
