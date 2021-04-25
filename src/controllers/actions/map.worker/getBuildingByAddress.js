export const getBuildingByAddress = function (address) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'getByAddress', key: address })
}
