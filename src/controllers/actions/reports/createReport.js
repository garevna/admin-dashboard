/* eslint-disable no-unused-vars */
import { eventsTable } from '@/controllers/events-table'
import { reports } from '@/controllers/events'

const [route, action] = ['reports', 'create']

export const createReport = function (callback) {
  eventsTable[reports[action]] = callback
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })
}
