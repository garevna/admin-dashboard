import { getAllRecords } from '../db'

const { getResellersListError } = require('../error-handlers').default

export const getResellersList = async () => {
  const [route, action] = ['rsp', 'list']

  const { status, result } = await getAllRecords('rsp')

  if (status !== 200) return getResellersListError(status)

  return { status, route, action, result: result.filter(rsp => rsp.userInfo.approved) }
}
