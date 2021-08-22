export const deleteBuilding = function (buildingId) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'building',
    action: 'delete',
    buildingId
  })
}
