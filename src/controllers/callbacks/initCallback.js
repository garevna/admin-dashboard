import { initError } from './'

export function initCallback (event) {
  event.stopImmediatePropagation()
  const { status } = event.data

  if (status === 200) {
    // window[Symbol.for('admin.worker')].addEventListener('message', refreshCallback)

    // window[Symbol.for('admin.worker')].removeEventListener('message', initCallback)
  } else initError()
}
