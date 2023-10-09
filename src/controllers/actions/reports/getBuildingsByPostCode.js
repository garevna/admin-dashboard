import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'get-buildings-by-postcode']

export const getBuildingsByPostCode = function (postCode, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, postCode })

  eventsTable[reports[action]] = callback
}
