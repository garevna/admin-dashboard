import { get } from '../AJAX'
import { encrypt } from '../crypto'

const [route, action] = ['admin', 'admins']

const availableRoles = ['SuperAdmin', 'admin', 'supervisor', 'Map_editor', 'View_only', 'Account_manager', 'Technician']

const getUserError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Get user credentials',
  errorMessage: 'Operation failed: remote server error'
}

export const getAdmins = async function () {
  const response = []

  for (const role of availableRoles) {
    const { status, result } = await get(`user?role=${role}`)

    if (status !== 200) {
      self.postMessage(getUserError)
      continue
    }

    for (const user of result) {
      const { login, password, phoneNumber } = user.userInfo

      const { result: credentials } = await encrypt(JSON.stringify({ login, password }))

      response.push({ id: user._id, role, login, password, phoneNumber, credentials })
    }
  }

  return { status: 200, route, action, result: response }
}
