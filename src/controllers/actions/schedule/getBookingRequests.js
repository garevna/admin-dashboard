import { eventsTable } from '@/controllers/events-table'
import { booking } from '@/controllers/events'

const [route, action] = ['booking', 'get']

export const getBookingRequests = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[booking[action]] = callback
}
