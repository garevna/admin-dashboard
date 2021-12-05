import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getShortListOfCustomers = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'short-list'
  })

  eventsTable[customers['short-list']] = callback
}
