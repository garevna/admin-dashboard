import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getCustomers = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'list'
  })

  eventsTable[customers.list] = callback
}
