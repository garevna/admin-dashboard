import { initError } from './'

export function initCallback (event) {
  event.stopImmediatePropagation()
  const { status } = event.data

  status !== 200 && initError()
}
