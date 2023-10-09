import { post, patch } from '../AJAX'
// import { idHandler } from '../env'
// import { putRecordByKey } from '../db'

import { encrypt, hash } from '../crypto'

const duplicated = 'A user with this login already exists.'

const [route, action] = ['admin', 'create']

export const createAdmin = async function (data) {
  const { login, password, role = 'admin', rights = 2, phoneNumber, ...details } = data

  if (!login || !password || !phoneNumber) return self.errorMessage('invalidRequest', null, route, action)

  const { result: hashPassword } = hash(password)

  const { result: auth } = encrypt(JSON.stringify({ login, phoneNumber, password: hashPassword }))

  Object.assign(details, { auth, role, rights })

  const { status, result } = await post('registration', details)

  if (result.error) {
    return result.error === duplicated
      ? self.errorMessage('duplicationError', 409, route, action)
      : Object.assign({}, { status: 500, route, action, error: true, errorType: 'Admin creation', errorMessage: result.error })
  }

  // idHandler(result.data._id)

  await patch(`user/${result.data._id}`, { role })

  // const response = await putRecordByKey('admin', idHandler(), Object.assign(result.data, { approved: true }))
  // if (response.status !== 200) return localDBError

  return {
    status,
    route,
    action,
    result: result.data,
    message: true,
    messageType: 'New DGtek admin',
    messageText: `${role} has been created`
  }
}
