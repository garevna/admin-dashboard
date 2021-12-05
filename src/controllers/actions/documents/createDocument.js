import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'post']

export const createDocument = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[documents[action]] = callback
}
