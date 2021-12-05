import { getAllRecords } from '../db'

const [route, action] = ['services', 'names']

export const getServiceNamesFromLocalDb = async function () {
  const { status, result } = await getAllRecords('services')

  if (status !== 200) return self.errorMessage('getServicesListError')

  return { status, route, action, result: result.map(service => service.serviceName) }
}
