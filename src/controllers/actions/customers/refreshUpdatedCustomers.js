import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'updated']

export const refreshUpdatedCustomers = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[customers[action]] = callback
}
