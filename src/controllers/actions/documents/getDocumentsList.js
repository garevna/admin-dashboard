import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'list']

export const getDocumentsList = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[documents[action]] = callback
}
