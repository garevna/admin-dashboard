import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'overview']

export const getOverview = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[reports[action]] = callback
}
