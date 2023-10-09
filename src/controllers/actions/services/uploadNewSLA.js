import { eventsTable } from '@/controllers/events-table'
import { sla } from '@/controllers/events'

const [route, action] = ['sla', 'post']

export const uploadNewSLA = function (title, file, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, title, file })

  eventsTable[sla[action]] = callback
}
