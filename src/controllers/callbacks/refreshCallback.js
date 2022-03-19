import { refreshError } from './'
import { refreshHandler, serviceStatusIconsHandler, roleHandler } from '../data-handlers'
import { setCategories } from '../../helpers'

export function refreshCallback (event) {
  const { status, route, action, ...data } = event.data

  if (status !== 200) return refreshError(route)

  refreshHandler(route, true)

  if (route === 'settings') {
    console.log('REFRESH SETTINGS\n', data)
    serviceStatusIconsHandler(data.result.serviceStatusIcons)
    setCategories(data.result.ticketCategories)
    const accessRights = data.result.accessSettings.access[roleHandler()]
    console.log('ACCESS RIGHTS:\n', accessRights)
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
