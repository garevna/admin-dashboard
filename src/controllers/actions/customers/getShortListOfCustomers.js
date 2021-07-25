export const getShortListOfCustomers = function () {
  console.log('SEND REQUEST FOR CUSTOMERS SHORT LIST')
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'short-list'
  })
}
