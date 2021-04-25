export const putBuildingDetails = function (id, details) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'put', key: id, data: details })
}
