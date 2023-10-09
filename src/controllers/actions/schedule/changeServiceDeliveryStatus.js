import { eventsTable } from '@/controllers/events-table'
import { booking } from '@/controllers/events'

const [route, action] = ['booking', 'update']

export const changeServiceDeliveryStatus = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[booking[action]] = callback
}
