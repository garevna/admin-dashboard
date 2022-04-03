import { eventsTable } from '@/controllers/events-table'
import { building } from '@/controllers/events'

const [route, action] = ['building', 'details']

export const getGroupOfBuildingDetails = function (list, props, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, list, props })

  eventsTable[building[action]] = callback
}
