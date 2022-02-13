import { eventsTable } from '@/controllers/events-table'
import { schedule } from '@/controllers/events'

const [route, action] = ['schedule', 'activate']

export const activateService = function (record, callback) {
  const {
    customerId,
    serviceId,
    activationDate,
    connectionData,
    installation,
    lots
  } = record

  if (!customerId || !serviceId || !activationDate || !connectionData) {
    return console.error('Invalid request:\n', { customerId, serviceId, activationDate, connectionData })
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route,
    action,
    record: {
      customerId,
      serviceId,
      activationDate,
      connectionData,
      installation,
      lots
    }
  })

  eventsTable[schedule[action]] = callback
}
