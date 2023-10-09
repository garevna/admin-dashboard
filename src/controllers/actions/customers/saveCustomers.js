import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'save']

export const saveCustomers = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, customers: data })

  eventsTable[customers[action]] = callback
}
