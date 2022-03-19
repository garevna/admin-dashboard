import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

const [route, action] = ['admin', 'admins']

export const getAdmins = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[admin[action]] = callback
}
