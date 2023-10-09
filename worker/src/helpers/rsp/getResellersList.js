import { getAllRecords } from '../db'

const [route, action] = ['rsp', 'list']

export const getResellersList = async () => {
  const { status, result } = await getAllRecords('rsp')

  if (status !== 200) return self.errorMessage('getResellersListError')

  return { status, route, action, result: result.filter(rsp => rsp.approved) }
}
