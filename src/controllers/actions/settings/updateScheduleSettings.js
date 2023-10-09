import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

export const updateScheduleSettings = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'update',
    section: 'scheduleCalendarSettings',
    data
  })

  eventsTable[settings.update] = callback
}
