import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'get', 'buildingSettings']

export const getBuildingSettings = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section })

  eventsTable[settings[action][section]] = callback
}
