import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'search-by-unique-code']

export const getCustomersByUniqueCode = function (uniqueCodeList, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, uniqueCodeList })

  eventsTable[customers[action]] = callback
}
