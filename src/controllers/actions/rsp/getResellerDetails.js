import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'get']

export const getResellerDetails = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[rsp[action]] = callback
}
