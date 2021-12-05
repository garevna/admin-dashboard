import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'update', 'estimatedServiceDeliveryTime']

export const updateEstimatedServiceDeliveryTime = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section, data })

  eventsTable[settings.update] = callback
}
