import { eventsTable } from '@/controllers/events-table'
import { schedule } from '@/controllers/events'

const [route, action] = ['schedule', 'pending']

export const getPendingRequests = function (callback) {
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action })

  eventsTable[schedule[action]] = callback
}
