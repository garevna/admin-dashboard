import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'patch']

export const patchServiceDetails = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id, data })

  eventsTable[services[action]] = callback
}
