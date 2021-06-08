import { getAllRecords } from '../db'

const { getRegistrationRequestsError } = require('../error-handlers').default

export const getRegistrationRequests = async () => {
  const [route, action] = ['rsp', 'registration']

  const response = await getAllRecords('rsp')

  if (response.status !== 200) return getRegistrationRequestsError(response.status)

  const requests = response.result.filter(rsp => !rsp.userInfo.approved)

  return { status: 200, route, action, result: requests }
}
