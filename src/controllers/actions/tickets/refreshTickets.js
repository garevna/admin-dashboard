import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'refresh']

export const refreshTickets = function (callback) {
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action })
  eventsTable[tickets[action]] = callback
}
