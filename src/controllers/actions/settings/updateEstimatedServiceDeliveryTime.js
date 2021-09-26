export const updateEstimatedServiceDeliveryTime = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'update',
    section: 'estimatedServiceDeliveryTime',
    data
  })
}
