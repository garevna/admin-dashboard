import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'partner']

export const getPartnerServices = function (partnerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, partnerId })

  eventsTable[services[action]] = callback
}
