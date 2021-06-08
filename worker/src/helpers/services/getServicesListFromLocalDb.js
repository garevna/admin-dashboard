import { getAllRecords } from '../db'
const { getServicesListError } = require('../error-handlers').default

export const getServicesListFromLocalDb = async function () {
  const { status, result } = await getAllRecords('services')

  return status !== 200 ? getServicesListError(status) : ({ status, route: 'services', action: 'list', result })
}
