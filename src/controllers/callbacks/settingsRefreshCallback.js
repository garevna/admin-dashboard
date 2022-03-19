import { refreshError } from './'

import {
  serviceStatusIconsHandler,
  roleHandler,
  accessRightsHandler
} from '../data-handlers'

import { setCategories } from '../../helpers'

export function settingsRefreshCallback (event) {
  const { status, route, action, ...data } = event.data

  if (status !== 200) return refreshError(route)

  serviceStatusIconsHandler(data.result.serviceStatusIcons)
  setCategories(data.result.ticketCategories)
  accessRightsHandler(data.result.accessSettings)
  accessRightsHandler(data.result.accessSettings.access[roleHandler()])
  // const accessRights = data.result.accessSettings.access[roleHandler()]

  // window[Symbol.for('vue.instance')].$root.$emit('settings-refreshed', route)
}
