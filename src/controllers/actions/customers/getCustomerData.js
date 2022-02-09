import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'get']

export const getCustomerData = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id })

  eventsTable[customers[action]] = callback
}
