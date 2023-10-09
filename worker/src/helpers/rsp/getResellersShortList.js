import { getAllRecords } from '../db'

export const getResellersShortList = async () => {
  const [route, action] = ['rsp', 'short']

  const { status, result } = await getAllRecords('rsp')

  if (status !== 200) return self.errorMessage('getResellersListError')

  return {
    status,
    route,
    action,
    result: result.filter(rsp => rsp.approved).map(rsp => ({ id: rsp._id, name: rsp.company.name, uniqueCode: rsp.uniqueCode }))
  }
}
