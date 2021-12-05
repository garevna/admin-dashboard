import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const postCustomer = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'post',
    data
  })

  eventsTable[customers.post] = callback
}
