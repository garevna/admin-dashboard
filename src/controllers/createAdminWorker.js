export function createAdminWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('admin.worker')] = new Worker(`${path}admin.worker.js`)
  window[Symbol.for('admin.worker')].onerror = function (error) {
    console.warn('Admin worker Error\n', error)
  }

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('admin.worker')]

  window[Symbol.for('admin.worker')].addEventListener('message', function (event) {
    if (event.data.status !== 300) return
    event.stopImmediatePropagation()
    console.log('WORKER DEBUGGING MESSAGE:\n', event.data)
  })
}
