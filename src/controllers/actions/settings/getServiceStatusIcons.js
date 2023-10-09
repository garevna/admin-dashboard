import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'get', 'serviceStatusIcons']

export const getServiceStatusIcons = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section })

  eventsTable[settings[action][section]] = callback
}
