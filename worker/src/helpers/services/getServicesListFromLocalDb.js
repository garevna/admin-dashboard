import { getAllRecords } from '../db'

export const getServicesListFromLocalDb = async function () {
  const { status, result } = await getAllRecords('services')

  return status !== 200 ? self.errorMessage('getServicesListError') : ({ status, route: 'services', action: 'list', result })
}
