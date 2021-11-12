export const startRefreshing = function () {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.instance')].$root.$emit('db-refreshing')
  window[Symbol.for('admin.worker')].postMessage({ route: '*', action: 'refresh' })
}
