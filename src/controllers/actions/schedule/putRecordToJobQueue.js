import { eventsTable } from '@/controllers/events-table'
import { schedule } from '@/controllers/events'

const [route, action] = ['schedule', 'job']

export const putRecordToJobQueue = function (record, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, request: record })

  eventsTable[schedule[action]] = callback
}
