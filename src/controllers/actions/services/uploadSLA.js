import { eventsTable } from '@/controllers/events-table'
import { sla } from '@/controllers/events'

const [route, action] = ['sla', 'upload']

export const uploadSLA = function (id, title, file, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, id, title, file })

  eventsTable[sla[action]] = callback
}
