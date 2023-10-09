import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'get-filtered-and-paginated']

export const getFilteredAndPaginated = function (filters, page, customersPerPage, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, filters, page, customersPerPage })

  eventsTable[customers[action]] = callback
}
