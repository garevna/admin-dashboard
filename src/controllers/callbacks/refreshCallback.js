import { refreshError } from './'

import { refreshHandler } from '../data-handlers'

export function refreshCallback (event) {
  const { status, route /*, action, result */ } = event.data

  // console.log('REFRESH CALLBACK:\n', event.data)

  if (status !== 200) return refreshError(route)

  // console.log('REFRESH CALLBACK:\n', status, route, action, result)
  refreshHandler(route, true)

  const routes = refreshHandler()
  // console.log(routes)
  if (!Object.keys(routes).filter(propName => !routes[propName]).length) {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
    window[Symbol.for('vue.instance')].$root.$emit('db-refreshing-complete')

    // window[Symbol.for('admin.worker')].removeEventListener('message', refreshCallback)
  }
}
