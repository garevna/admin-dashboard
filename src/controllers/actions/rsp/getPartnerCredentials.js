import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'credentials']

export const getPartnerCredentials = function (resellerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, resellerId })

  eventsTable[rsp[action]] = callback
}
