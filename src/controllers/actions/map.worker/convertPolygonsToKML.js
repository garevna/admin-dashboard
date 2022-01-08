import { eventsTable } from '@/controllers/events-table'
import { polygons } from '@/controllers/events'

const [route, action] = ['polygons', 'kml']

export const convertPolygonsToKML = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[polygons[action]] = callback
}
