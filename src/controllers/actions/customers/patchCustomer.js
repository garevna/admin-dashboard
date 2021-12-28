import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'patch']

export const patchCustomer = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id, data })

  eventsTable[customers[action]] = callback
}
