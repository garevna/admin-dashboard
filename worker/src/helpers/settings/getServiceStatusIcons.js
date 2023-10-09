import { serviceStatusIconsHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'serviceStatusIcons']

export const getServiceStatusIcons = () => ({
  status: 200,
  route,
  action,
  section,
  result: serviceStatusIconsHandler()
})
