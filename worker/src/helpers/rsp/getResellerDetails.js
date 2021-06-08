import { getRecordByKey } from '../db'
const { getUserDetailsError } = require('../error-handlers').default

export const getResellerDetails = async (id) => {
  const [route, action] = ['rsp', 'list']

  const { status, result } = await getRecordByKey('rsp', id)

  if (status !== 200) return getUserDetailsError(status)

  return { status, route, action, result }
}
