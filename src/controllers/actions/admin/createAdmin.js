import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

const [route, action] = ['admin', 'create']

export const createAdmin = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[admin[action]] = callback
}
