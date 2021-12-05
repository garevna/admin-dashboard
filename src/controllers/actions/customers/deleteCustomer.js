import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const deleteCustomer = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'delete',
    key: id
  })

  eventsTable[customers.delete] = callback
}
