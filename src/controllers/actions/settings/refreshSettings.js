import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, key] = ['settings', 'get', '*']

export const refreshSettings = function (callback) {
  console.log('REFRESH SETTINGS\n', callback)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key })

  eventsTable[settings[action]] = callback
}
