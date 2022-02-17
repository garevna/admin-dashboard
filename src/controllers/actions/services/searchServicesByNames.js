import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'group-search']

export const searchServicesByNames = function (serviceNamesList, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, serviceNames: serviceNamesList })

  eventsTable[services[action]] = callback
}
