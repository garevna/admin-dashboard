import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'location-dynamic']

export const getLocationDynamic = function (location, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, location })

  eventsTable[reports[action]] = callback
}
