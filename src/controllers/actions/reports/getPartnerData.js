import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'get-partner-data']

export const getPartnerData = function (partnerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, partnerId })

  eventsTable[reports[action]] = callback
}
