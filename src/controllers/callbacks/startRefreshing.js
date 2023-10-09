import { eventsTable } from '@/controllers/events-table'
import { refreshCallback } from './'

export const startRefreshing = function () {
  window[Symbol.for('admin.worker')].postMessage({ route: '*', action: 'refresh' })
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.instance')].$root.$emit('db-refreshing')

  eventsTable['all-refreshed'] = refreshCallback
}
