export const changeServiceDeliveryStatus = function (data) {
  console.log(data)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'booking',
    action: 'update',
    data
  })
}
