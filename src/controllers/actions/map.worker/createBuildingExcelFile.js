import { eventsTable } from '@/controllers/events-table'
import { building } from '@/controllers/events'

const [route, action] = ['building', 'excel']

export const createBuildingExcelFile = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[building[action]] = callback
}
