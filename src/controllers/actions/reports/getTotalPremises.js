import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'create']

export const getTotalPremises = function (list, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, list })

  eventsTable[reports[action]] = callback
}
