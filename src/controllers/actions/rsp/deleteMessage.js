import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'delete-message']

export const deleteMessage = function (messageId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, messageId })

  eventsTable[rsp[action]] = callback
}
