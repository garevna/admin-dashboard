import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'short']

export const getServiceList = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[services[action]] = callback
}
