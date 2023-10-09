import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

const [route, action] = ['admin', 'details']

export const getAdminDetails = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, id })

  eventsTable[admin[action]] = callback
}
