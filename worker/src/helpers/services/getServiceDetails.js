import { getRecordByKey } from '../db'
const { getServiceDetailsError } = require('../error-handlers').default

export const getServiceDetails = async function (id) {
  const { status, result } = await getRecordByKey('services', id)

  return status !== 200 ? getServiceDetailsError(status) : ({ status, route: 'services', action: 'get', result })
}
