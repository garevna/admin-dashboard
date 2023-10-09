import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'update', 'buildingSettings']

export const updateBuildingSettings = function ({ buildingClass, buildingType, buildingCategory }, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section, data: { buildingClass, buildingType, buildingCategory } })

  eventsTable[settings[action][section]] = callback
}
