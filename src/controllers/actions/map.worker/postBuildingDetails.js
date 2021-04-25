export const postBuildingDetails = function (details) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'post', data: details })
}
