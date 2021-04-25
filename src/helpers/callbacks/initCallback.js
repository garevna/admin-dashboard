import { initError } from './'

export function initCallback (event) {
  const { status, action } = event.data
  if (action !== 'init') return console.log('initCallback not removed')
  event.stopImmediatePropagation()
  window[Symbol.for('rsp.worker')].removeEventListener('message', initCallback)
  status !== 200 && initError()
}
