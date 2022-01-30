import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'patch-group']

export const patchServicesGroup = function (partnerId, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, partnerId, data })

  eventsTable[services[action]] = callback
}
