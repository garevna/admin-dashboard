export const changeServiceDeliveryStatus = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'booking',
    action: 'update',
    data
  })
}
