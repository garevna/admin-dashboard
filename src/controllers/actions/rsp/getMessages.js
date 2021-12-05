import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'get-messages']

export const getMessages = function (resellerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, resellerId })

  eventsTable[rsp[action]] = callback
}
