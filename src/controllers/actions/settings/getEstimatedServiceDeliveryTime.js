export const getEstimatedServiceDeliveryTime = function (key) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'estimatedServiceDeliveryTime',
    key
  })
}
