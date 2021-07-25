import { refreshError } from './'

import { refreshHandler } from '../data-handlers'

import { mainDashboard } from '../../configs'

const setCategories = function (categories) {
  categories
    .forEach((title, index) => mainDashboard.find(item => item.refresh === 'tickets')
      .children.push({
        title,
        route: 'tickets',
        path: `/tickets/${categories[index].toKebab()}`,
        params: { section: categories[index].toKebab() },
        icon: 'mdi-ballot-outline',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      })
    )
}

export function refreshCallback (event) {
  const { status, route, ...data } = event.data

  if (status !== 200) return refreshError(route)

  refreshHandler(route, true)

  if (route === 'tickets') setCategories(data.result.ticketCategories)

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
