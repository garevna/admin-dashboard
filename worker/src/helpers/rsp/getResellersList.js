import { getAllRecords } from '../db'

export const getResellersList = async () => {
  const [route, action] = ['rsp', 'list']

  const { status, result } = await getAllRecords('rsp')

  if (status !== 200) return self.errorMessage('getResellersListError')

  return { status, route, action, result: result.filter(rsp => rsp.userInfo.approved) }
}
