import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'post']

export const createNewService = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[services[action]] = callback
}
