import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'read']

export const readLocalDocument = function (file, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, file })

  eventsTable[documents[action]] = callback
}
