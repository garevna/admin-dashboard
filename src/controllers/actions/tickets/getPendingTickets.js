import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'pending']

export const getPendingTickets = function (callback) {
  // window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action })

  eventsTable[tickets[action]] = callback
}
