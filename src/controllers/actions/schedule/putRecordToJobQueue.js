export const putRecordToJobQueue = function (record) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'schedule',
    action: 'job',
    request: record
  })
}
