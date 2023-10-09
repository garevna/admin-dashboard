import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'import-updates']

export const importCustomerUpdates = function (file, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, file })

  eventsTable[customers[action]] = callback
}
