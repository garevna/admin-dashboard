import { getRecordByKey } from '../db'
import { encrypt } from '../crypto'

const [route, action] = ['admin', 'credentials']

const getUserDetailsError = {
  status: 500,
  error: true,
  errorType: 'Get user credentials',
  errorMessage: 'Operation failed: remote server error'
}

export const getUserCredentials = async function (userId) {
  const { status, result: user } = await getRecordByKey('user', userId)

  if (status !== 200) return self.errorMessage(Object.assign(getUserDetailsError, { route, action }))

  const { login, password } = user.userInfo

  return { status: 200, route, action, result: await encrypt(JSON.stringify({ login, password })) }
}
