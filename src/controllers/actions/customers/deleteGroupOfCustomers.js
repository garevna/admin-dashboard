import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'delete-group']

export const deleteGroupOfCustomers = function (keys, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, keys })

  eventsTable[customers[action]] = callback
}
