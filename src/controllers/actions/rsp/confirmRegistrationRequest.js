import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'confirm-registration-request']

export const confirmRegistrationRequest = function (id, uniqueCode, callback) {
  console.log(rsp[action])
  console.log(callback)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data: { id, uniqueCode } })

  eventsTable[rsp[action]] = callback
  console.log(eventsTable)
}
