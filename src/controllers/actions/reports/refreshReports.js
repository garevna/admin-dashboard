/* eslint-disable no-unused-vars */
import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'refresh']

export const createReport = function (callback) {
  console.log('REFRESH REPORTS!!!')
  // eventsTable[reports[action]] = callback
  // window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })
}
