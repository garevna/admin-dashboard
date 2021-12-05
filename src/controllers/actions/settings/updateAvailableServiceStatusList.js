import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'get', 'availableServiceStatusConfig']

export const updateAvailableServiceStatusConfig = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section, data })

  eventsTable[settings[action][section]] = callback
}
