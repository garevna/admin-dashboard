import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'update', 'pendingConnectionStatus']

export const updatePendingConnectionSettings = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section, data })

  eventsTable[settings[action]] = callback
}
