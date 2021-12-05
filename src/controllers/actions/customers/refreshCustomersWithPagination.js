import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const refreshCustomersWithPagination = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'pagination'
  })

  eventsTable[customers.pagination] = callback
}
