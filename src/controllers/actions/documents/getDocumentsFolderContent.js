import { eventsTable } from '@/controllers/events-table'
import { documents } from '@/controllers/events'

const [route, action] = ['documents', 'dir']

export const getDocumentsFolderContent = function (folder, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, folder })

  eventsTable[documents[action]] = callback
}
