export const changeServiceDeliveryStatus = function (customerId, serviceId, status) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'booking',
    action: 'update',
    customerId,
    serviceId,
    status
  })
}
