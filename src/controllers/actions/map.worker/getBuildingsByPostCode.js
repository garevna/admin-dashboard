import { eventsTable } from '@/controllers/events-table'
import { building } from '@/controllers/events'

const [route, action] = ['building', 'get-buildings-by-postcode']

export const getBuildingsByPostCode = function (postCode, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, postCode })

  eventsTable[building[action]] = callback
}
