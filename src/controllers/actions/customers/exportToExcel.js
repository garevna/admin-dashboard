import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'export']

export const exportToExcel = function (options, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, options })

  eventsTable[customers[action]] = callback
}
