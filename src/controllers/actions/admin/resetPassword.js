import { loginHandler } from '@/controllers/data-handlers'

import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

const [route, action] = ['admin', 'reset']

export const resetPassword = function (resolve, reject) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, login: loginHandler() })

  eventsTable[admin[action]] = resolve
  eventsTable[admin.failure] = reject
}
