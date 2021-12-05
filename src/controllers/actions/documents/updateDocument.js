import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'update']

export const updateDocument = function (key, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key, data })

  eventsTable[documents[action]] = callback
}
