import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'buildings']

export const getBuildingsByAddressList = function (addressList, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route,
    action,
    addressList
  })

  eventsTable[customers[action]] = callback
}
