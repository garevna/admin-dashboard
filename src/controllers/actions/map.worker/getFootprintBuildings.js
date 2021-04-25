export const getFootprintBuildings = function () {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'list', key: 'footprint' })
}
