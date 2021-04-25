import { init } from '@/controllers/actions'
import { initCallback, initError } from './callbacks'

export function createAdminWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''
  console.log('PATH: ', path)

  window[Symbol.for('admin.worker')] = new Worker(`/${path}rsp.worker.js`)
  window[Symbol.for('admin.worker')].onerror = function (error) {
    initError()
    console.log('Admin worker Error\n', error)
  }

  window[Symbol.for('admin.worker')].addEventListener('message', initCallback)

  init()

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('admin.worker')]
}
