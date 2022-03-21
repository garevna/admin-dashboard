import { patch } from '../AJAX'

import { invalidRequest } from '../../errors'

const duplicated = 'A user with this login already exists.'

const [route, action] = ['admin', 'update']

const error = { route, action, error: true, errorType: 'Admin details update' }

const duplicationError = Object.assign({}, error, {
  status: 409,
  errorMessage: 'Login already in use'
})

export const updateAdmin = async function (data) {
  const { id, login, password, role = 'admin', phoneNumber } = data

  if (!id || !role || !login || !phoneNumber) return invalidRequest()

  const { status, result } = await patch(`user/${id}`, { role, userInfo: { login, password, phoneNumber } })

  if (result.error) return result.error === duplicated ? duplicationError : Object.assign({}, error, { status: 500, errorMessage: result.error })

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
