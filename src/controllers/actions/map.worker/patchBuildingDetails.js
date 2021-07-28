export const patchBuildingDetails = function (buildingId, details) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'patch', key: buildingId, data: details })
}
