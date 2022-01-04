import { eventsTable } from '@/controllers/events-table'
import { files } from '@/controllers/events'

const [route, action] = ['files', 'get']

export const getFile = function (buildingId, section, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, buildingId, section })

  eventsTable[`${section}-${files[action]}`] = callback
}
