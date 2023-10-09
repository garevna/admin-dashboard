import { codeHandler } from '@/controllers/data-handlers'

import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

const [route, action] = ['admin', 'code']

export const sendPasswordResetCode = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, code: codeHandler() })

  eventsTable[admin[action]] = callback
}
