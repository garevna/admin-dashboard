import { eventsTable } from '@/controllers/events-table'
import { lots } from '@/controllers/events'

const [route, action] = ['lots', 'update']

export const updateScheduleLots = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, data })

  eventsTable[lots[action]] = callback
}
