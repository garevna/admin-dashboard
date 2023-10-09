import { searchServiceByName } from '../db'

const [route, action] = ['services', 'group-search']

export const getServicesByNames = async serviceNames => {
  const promises = serviceNames.map(serviceName => searchServiceByName(serviceName))
  const result = await Promise.all(promises)

  return { status: 200, route, action, result: result.map(item => item.result) }
}
