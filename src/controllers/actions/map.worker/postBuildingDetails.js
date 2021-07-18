export const postBuildingDetails = function (details) {
  console.log('POST NEW BUILDING:\n', details)
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'post', data: details })
}
