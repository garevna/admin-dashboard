import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'filtered-short-list']

export const getFilteredShortListOfCustomers = function (filter, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, filter })

  eventsTable[customers[action]] = callback
}
