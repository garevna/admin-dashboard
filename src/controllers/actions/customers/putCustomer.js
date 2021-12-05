import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const putCustomer = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'put',
    key: id,
    data
  })

  eventsTable[customers.put] = callback
}
