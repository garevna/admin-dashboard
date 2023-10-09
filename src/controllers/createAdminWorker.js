import { globalCallback } from './globalCallback'

export function createAdminWorker () {
  window[Symbol.for('admin.worker')] = Object.assign(new Worker(`${location.origin}/admin.worker.js`), {
    onerror: (error) => console.error(`! Admin worker Error\n${error?.message}\nFile: ${error?.filename}\nLine #: ${error?.lineno}\n`, 'ERROR:\n', error),
    onmessage: globalCallback
  })

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('admin.worker')]
}
