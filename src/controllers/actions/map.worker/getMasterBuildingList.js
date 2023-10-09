import { eventsTable } from '@/controllers/events-table'
import { building } from '@/controllers/events'

const [route, action] = ['building', 'master-list']

const getBuildingList = data => {
  const list = data.map(item => item.id)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, list })
}

export const getMasterBuildingList = function (callback) {
  window[Symbol.for('map.worker')].getBuildingsListForTable('lit', getBuildingList)

  eventsTable[building[action]] = callback
}
