import { getRecordByKey } from '../db'

export const getResellerDetails = async (id) => {
  const [route, action] = ['rsp', 'list']

  const { status, result } = await getRecordByKey('rsp', id)

  if (status !== 200) return self.errorMessage('getUserDetailsError')

  return { status, route, action, result }
}
