import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'list']

export const getCustomers = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route,
    action
  })

  eventsTable[customers[action]] = callback
}
