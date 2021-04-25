import { initError } from './'

export function initCallback (event) {
  const { status, action } = event.data
  if (action !== 'init') return console.log('initCallback not removed')
  event.stopImmediatePropagation()
  if (status === 200) {
    window[Symbol.for('admin.worker')].removeEventListener('message', initCallback)
  } else initError()
}
