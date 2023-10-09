import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'get']

export const getDocumentContent = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: id })

  eventsTable[documents[action]] = callback
}
