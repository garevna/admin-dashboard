import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

const [route, action] = ['services', 'refresh']

export const refreshServices = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[services[action]] = callback
}
