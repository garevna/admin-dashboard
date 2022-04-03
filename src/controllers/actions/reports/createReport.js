/* eslint-disable no-unused-vars */
import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'create']

const getBuildingList = data => {
  const list = data.map(item => item.id)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, list })
}

export const createReport = function (callback) {
  eventsTable[reports[action]] = callback
  window[Symbol.for('map.worker')].getBuildingsListForTable('lit', getBuildingList)
}
