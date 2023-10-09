import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'get']

export const getServiceDetails = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id })

  eventsTable[services[action]] = callback
}
