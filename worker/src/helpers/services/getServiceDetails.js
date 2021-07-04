import { getRecordByKey } from '../db'

export const getServiceDetails = async function (id) {
  const { status, result } = await getRecordByKey('services', id)

  return status !== 200 ? self.errorMessage('getServiceDetailsError') : ({ status, route: 'services', action: 'get', result })
}
