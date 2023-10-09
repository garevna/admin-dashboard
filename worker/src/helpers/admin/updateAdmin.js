import { patch } from '../AJAX'

const [route, action] = ['admin', 'update']

export const updateAdmin = async function (data) {
  const { id, login, password, role = 'admin', phoneNumber } = data

  if (!id || !role || !login || !phoneNumber) return self.errorMessage('invalidRequest', null, route, action)

  const { status, result } = await patch(`user/${id}`, { role, userInfo: { login, password, phoneNumber } })

  if (result.error) {
    return result.error === 'A user with this login already exists.'
      ? self.errorMessage('duplicationError', null, route, action)
      : Object.assign(self.errorMessage('updateAdminError'), { errorMessage: result.error })
  }

  return {
    status,
    route,
    action,
    result: result.data,
    message: true,
    messageType: `DGtek ${role}`,
    messageText: `${login} has been updated`
  }
}
