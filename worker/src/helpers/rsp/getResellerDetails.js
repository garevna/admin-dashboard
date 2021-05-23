import { getRecordByKey } from '../db'
import { getUserDetailsError } from '../error-handlers'

export const getResellerDetails = async (id) => {
  const [route, action] = ['rsp', 'list']

  const { status, result } = await getRecordByKey('rsp', id)
  // self.postMessage({ status: 300, route, action, result })
  if (status !== 200) return getUserDetailsError(status)

  return { status, route, action, result }
}
