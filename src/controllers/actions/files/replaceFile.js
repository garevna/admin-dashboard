import { eventsTable } from '@/controllers/events-table'
import { files } from '@/controllers/events'

const [route, action] = ['files', 'replace']

export const replaceFile = function (buildingId, section, data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, buildingId, section, data })

  eventsTable[files[action]] = callback
}
