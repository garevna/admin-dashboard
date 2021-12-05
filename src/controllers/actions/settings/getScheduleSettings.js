import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action, section] = ['settings', 'get', 'scheduleCalendarSettings']

export const getScheduleSettings = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, section })

  eventsTable[settings.get[section]] = callback
}
