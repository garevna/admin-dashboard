import { eventsTable } from '@/controllers/events-table'
import { files } from '@/controllers/events'

const [route, action] = ['files', 'remove']

export const deleteFile = function (buildingId, section, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, buildingId, section })

  eventsTable[files[action]] = callback
}
