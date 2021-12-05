import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getCustomerData = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'get',
    key: id
  })

  eventsTable[customers.get] = callback
}
