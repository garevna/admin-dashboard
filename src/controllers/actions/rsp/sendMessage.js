import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'send-message']

export const sendMessage = function (message, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, message })

  eventsTable[rsp[action]] = callback
}
