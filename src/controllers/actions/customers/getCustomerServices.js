import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'services']

export const getCustomerServices = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, customerId: id })

  eventsTable[customers[action]] = callback
}
