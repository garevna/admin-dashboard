import { getRecordByKey } from '../db'
import { encrypt } from '../crypto'

const [route, action] = ['rsp', 'credentials']

const getUserDetailsError = {
  status: 500,
  error: true,
  errorType: 'Get patrner credentials',
  errorMessage: 'Operation failed: remote server error'
}

export const getPartnerCredentials = async function (partnerId) {
  const { status, result: partner } = await getRecordByKey('rsp', partnerId)

  if (status !== 200) return self.errorMessage(Object.assign(getUserDetailsError, { route, action }))

  const { login, password } = partner.userInfo

  return { status: 200, route, action, result: await encrypt(JSON.stringify({ login, password })) }
}
