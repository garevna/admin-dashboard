export const getCustomersForExcel = function (data) {
  console.log('SOURCE DATA:\n', data)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'excel',
    data
  })
}
