import { getRecordByKey } from '../db'
import { getServiceDetailsError } from '../error-handlers'

export const getServiceDetails = async function (id) {
  const { status, result } = await getRecordByKey('services', id)
  if (status !== 200) return getServiceDetailsError(status)
  return { status, route: 'services', action: 'get', result }
}
