import { get } from '../AJAX'

const [route, action] = ['admin', 'details']

const getUserDetailsError = {
  status: 500,
  error: true,
  errorType: 'Get user details',
  errorMessage: 'Operation failed: remote server error'
}

export const getUserDetails = async function (userId) {
  const { status, result } = await get(`user/${userId}`)

  if (status !== 200) return self.errorMessage(Object.assign(getUserDetailsError, { route, action }))

  const { role, userInfo } = result
  const { login, password, phoneNumber } = userInfo

  return { status: 200, route, action, result: { role, login, password, phoneNumber } }
}
