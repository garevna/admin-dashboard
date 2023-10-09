import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'patch']

export const patchDocument = function (key, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key, data })

  eventsTable[documents[action]] = callback
}
