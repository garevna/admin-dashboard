import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'rsp']

export const getTicketsOfPartner = function (resellerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, resellerId })

  eventsTable[tickets[action]] = callback
}
