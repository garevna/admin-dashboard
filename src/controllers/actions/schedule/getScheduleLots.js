import { eventsTable } from '@/controllers/events-table'
import { lots } from '@/controllers/events'

const [route, action] = ['lots', 'get']

export const getScheduleLots = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[lots[action]] = callback
}
