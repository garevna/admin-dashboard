export const patchBuildingDetails = function (buildingId, details) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'building',
    action: 'patch',
    buildingId,
    details
  })
}
