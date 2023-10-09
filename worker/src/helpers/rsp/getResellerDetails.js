import { getRecordByKey } from '../db'

const [route, action] = ['rsp', 'get']

export const getResellerDetails = async (id) => {
  const { status, result } = await getRecordByKey('rsp', id)

  return status !== 200 ? self.errorMessage('getUserDetailsError') : { status, route, action, result }
}
