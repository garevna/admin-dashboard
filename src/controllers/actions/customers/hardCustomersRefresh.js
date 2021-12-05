import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const hardCustomersRefresh = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'hard-refresh'
  })

  eventsTable[customers['hard-refresh']] = callback
}
