export const getBookingRequests = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'booking',
    action: 'get'
  })
}
