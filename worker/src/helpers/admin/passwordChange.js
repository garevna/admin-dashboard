import { hash, encrypt } from '../crypto'
import { loginHandler, passwordHandler, credentialsHandler } from '../env'
import { post } from '../AJAX'

const [route, action] = ['rsp', 'change-password']

export const passwordChange = async function (request) {
  const { login, newPass, userPhone } = request.data

  if (!login || !newPass || !userPhone) return self.errorMessage('credentialsError')

  const { result: newPasswordHash } = hash(newPass)

  const { status: encryptStatus, result: cryptoPassword } = await encrypt(JSON.stringify({ password: newPasswordHash }))

  if (encryptStatus !== 200) return self.errorMessage('credentialsError')

  const { status } = post('pass/change', {
    newPass: cryptoPassword,
    login,
    userPhone
  })

  if (status !== 200) return self.errorMessage('credentialsError')

  loginHandler(login)
  passwordHandler(newPasswordHash)

  const { status: cryptoStatus, result: credentials } = encrypt(JSON.stringify({
    login,
    password: passwordHandler()
  }))

  if (cryptoStatus !== 200) return self.errorMessage('credentialsError')

  credentialsHandler(credentials)

  return {
    status,
    route,
    action,
    result: 'Password changed',
    message: true,
    messageType: 'Company credentials',
    messageText: 'Password changed'
  }
}
