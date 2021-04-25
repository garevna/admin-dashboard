import { hash, encrypt } from '../crypto'
import { loginHandler, passwordHandler, credentialsHandler } from '../env'
import { post } from '../AJAX'
import { credentialsError } from '../error-handlers'

export const passwordChange = async function (request) {
  const { login, newPass, userPhone } = request.data

  if (!login || !newPass || !userPhone) return credentialsError(422)

  const { result: newPasswordHash } = hash(newPass)

  const { status: encryptStatus, result: cryptoPassword } = await encrypt(JSON.stringify({ password: newPasswordHash }))

  if (encryptStatus !== 200) return credentialsError(encryptStatus)

  const { status } = post('pass/change', {
    newPass: cryptoPassword,
    login,
    userPhone
  })

  if (status !== 200) return credentialsError(status)

  loginHandler(login)
  passwordHandler(newPasswordHash)

  const { status: cryptoStatus, result: credentials } = encrypt(JSON.stringify({
    login,
    password: passwordHandler()
  }))

  if (cryptoStatus !== 200) return credentialsError(cryptoStatus)

  credentialsHandler(credentials)

  return {
    status,
    route: 'rsp',
    action: 'change-password',
    result: 'Password changed',
    message: true,
    messageType: 'Company credentials',
    messageText: 'Password changed'
  }
}
