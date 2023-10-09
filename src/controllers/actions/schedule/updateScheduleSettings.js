import { eventsTable } from '@/controllers/events-table'
import { schedule } from '@/controllers/events'

const [route, action] = ['schedule', 'config']

export const updateScheduleSettings = function (settings, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, settings })

  eventsTable[schedule[action]] = callback
}
