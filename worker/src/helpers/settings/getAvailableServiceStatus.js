import { availableServiceStatusHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'availableServiceStatus']

export const getAvailableServiceStatus = () => ({
  status: 200,
  route,
  action,
  section,
  result: availableServiceStatusHandler()
})
