import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

const [route, action] = ['admin', 'update']

export const updateAdmin = function ({ id, role, login, password, phoneNumber }, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data: { id, role, login, password, phoneNumber } })

  eventsTable[admin[action]] = callback
}
