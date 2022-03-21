import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'update', 'accessSettings']

export const updateAccessSettings = function ({ access, roles }, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section, data: { access, roles } })

  eventsTable[settings[action]] = callback
}
