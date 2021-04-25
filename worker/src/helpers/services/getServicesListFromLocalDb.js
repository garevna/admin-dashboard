import { getAllRecords } from '../db'
import { getServicesListError } from '../error-handlers'

export const getServicesListFromLocalDb = async function () {
  const { status, result } = await getAllRecords('services')
  if (status !== 200) return getServicesListError(status)
  return { status, route: 'services', action: 'list', result }
}
