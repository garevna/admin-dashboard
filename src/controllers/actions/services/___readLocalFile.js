import { eventsTable } from '@/controllers/events-table'
import { files } from '@/controllers/events'

const [route, action] = ['files', 'read']

export const readLocalFile = function (file, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, file })

  eventsTable[files[action]] = callback
}
