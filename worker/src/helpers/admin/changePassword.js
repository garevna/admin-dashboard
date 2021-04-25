import { hostHandler, apiKeyHandler, credentialsHandler } from '../env'
import { resetOffline, encryptError, resetError } from '../errors'
import { encrypt, hash } from '../crypto'

const type = 'Change password'

export const changePassword = async (password) => {
  if (!navigator.onLine) return resetOffline()

  const { result: hashPassword } = hash(password)
  const { status, result } = encrypt(JSON.stringify({ password: hashPassword }))
  if (status !== 200) return encryptError()

  const response = await fetch(`${hostHandler()}/pass/change`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify({ newPass: result })
  })

  if (status !== 200) return resetError(response.status)

  return {
    status: response.status,
    action: 'change',
    result: await response.json(),
    message: true,
    messageType: type,
    messageText: 'Password successfuly changed'
  }
}
