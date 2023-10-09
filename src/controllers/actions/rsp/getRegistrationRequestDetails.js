import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'registration-request-details']

export const getRegistrationRequestDetails = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, id })

  eventsTable[rsp[action]] = callback
}
