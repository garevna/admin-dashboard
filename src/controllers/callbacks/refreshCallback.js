import { refreshError } from './'
import { refreshHandler, serviceStatusIconsHandler } from '../data-handlers'
import { setCategories } from '../../helpers'

export function refreshCallback (event) {
  const { status, route, action, ...data } = event.data

  if (status !== 200) return refreshError(route)

  refreshHandler(route, true)

  if (route === 'settings') {
    serviceStatusIconsHandler(data.result.serviceStatusIcons)
    setCategories(data.result.ticketCategories)
  }

  window[Symbol.for('vue.instance')].$root.$emit(`${route}-refreshed`, route)
  window[Symbol.for('vue.instance')].$root.$emit(`${route}-data-refreshed`, data)

  const routes = refreshHandler()

  if (!Object.keys(routes).filter(propName => !routes[propName]).length) {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
    window[Symbol.for('vue.instance')].$root.$emit('db-refreshing-complete')
  } else {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  }
}
