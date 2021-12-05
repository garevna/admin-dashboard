import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

export const updateTicketCategories = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'update',
    section: 'ticketCategories',
    data
  })

  eventsTable[settings.update] = callback
}
