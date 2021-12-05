import { eventsTable } from '@/controllers/events-table'
import { schedule } from '@/controllers/events'

const [route, action] = ['schedule', 'get']

export const getScheduleWeekData = function (weekNumber, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, key: weekNumber })

  eventsTable[schedule[action]] = callback
}
