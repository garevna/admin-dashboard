import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'put']

export const putCustomer = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id, data })

  eventsTable[customers[action]] = callback
}
