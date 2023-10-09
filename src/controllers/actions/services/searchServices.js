import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'partial-search']

export const searchServices = function (searchString, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, searchString })

  eventsTable[services[action]] = callback
}
