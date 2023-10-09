import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'import']

export const importCustomers = function (file, resellerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, file, resellerId })

  eventsTable[customers[action]] = callback
}
