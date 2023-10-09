import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'search']

export const getServiceIdByServiceName = function (serviceName, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, serviceName })

  eventsTable[services[action]] = callback
}
