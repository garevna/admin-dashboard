import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'customers']

export const getCustomersByResellerId = function (resellerId, callback) {
  console.log(rsp[action])
  console.log(callback)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, resellerId })

  eventsTable[rsp[action]] = callback
}
