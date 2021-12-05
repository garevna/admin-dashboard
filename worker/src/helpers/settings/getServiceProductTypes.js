import { serviceProductTypesHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'serviceProductTypes']

export const getServiceProductTypes = () => ({
  status: 200,
  route,
  action,
  section,
  result: serviceProductTypesHandler()
})
