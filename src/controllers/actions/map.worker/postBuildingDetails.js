export const postBuildingDetails = function (details) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'building',
    action: 'post',
    details
  })
}
