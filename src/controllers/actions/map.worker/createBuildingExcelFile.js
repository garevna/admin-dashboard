export const createBuildingExcelFile = function (data) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'building',
    action: 'excel',
    data
  })
}
