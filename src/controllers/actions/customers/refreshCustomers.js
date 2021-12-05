import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const refreshCustomers = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'refresh'
  })

  eventsTable[customers.refresh] = callback
}
