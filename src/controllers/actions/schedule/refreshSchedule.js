import { eventsTable } from '@/controllers/events-table'
import { schedule } from '@/controllers/events'

const [route, action] = ['schedule', 'refresh']

export const refreshSchedule = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[schedule[action]] = callback
}
