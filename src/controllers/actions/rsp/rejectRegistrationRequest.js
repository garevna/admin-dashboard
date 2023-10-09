import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'reject']

export const rejectRegistrationRequest = function (id, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, id })

  eventsTable[rsp[action]] = callback
}
