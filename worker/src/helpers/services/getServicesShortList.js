import { getAllRecords } from '../db'

const [route, action] = ['services', 'short']

export const getServicesShortList = async function () {
  const { status, result } = await getAllRecords('services')

  if (status !== 200) return self.errorMessage('getServicesListError')

  return { status, route, action, result: Object.assign({}, ...result.map(service => ({ [service._id]: service.serviceName }))) }
}
