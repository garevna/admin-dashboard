import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getCustomersForExcel = function (data, callback) {
  console.log('SOURCE DATA:\n', data)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'excel',
    data
  })

  eventsTable[customers.excel] = callback
}
