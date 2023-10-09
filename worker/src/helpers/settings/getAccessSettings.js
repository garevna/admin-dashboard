import { accessSettingsHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'accessSettings']

export const getAccessSettings = () => ({
  status: 200,
  route,
  action,
  section,
  result: accessSettingsHandler()
})
