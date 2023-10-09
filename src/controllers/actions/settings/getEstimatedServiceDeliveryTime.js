import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'get', 'estimatedServiceDeliveryTime']

export const getEstimatedServiceDeliveryTime = function (key, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section, key })

  eventsTable[settings.get[section]] = callback
}
