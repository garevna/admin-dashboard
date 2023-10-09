import { eventsTable } from '@/controllers/events-table'
import { sla } from '@/controllers/events'

const [route, action] = ['sla', 'create']

export const createSLA = function (record, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, record })

  eventsTable[sla[action]] = callback
}
