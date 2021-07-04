import { getAllRecords } from '../db'

export const getRegistrationRequests = async () => {
  const [route, action] = ['rsp', 'registration']

  const response = await getAllRecords('rsp')

  if (response.status !== 200) return self.errorMessage('getRegistrationRequestsError')

  const requests = response.result.filter(rsp => !rsp.userInfo.approved)

  return { status: 200, route, action, result: requests }
}
