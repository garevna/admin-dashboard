import { hostHandler, apiKeyHandler, credentialsHandler } from '../env'
import { encrypt, hash } from '../crypto'

const [route, action] = ['admin', 'change']

export const changePassword = async (password) => {
  // if (!navigator.onLine) return resetOffline()

  const { result: hashPassword } = hash(password)
  const { status, result } = encrypt(JSON.stringify({ password: hashPassword }))
  if (status !== 200) return self.errorMessage('encryptError')

  const response = await fetch(`${hostHandler()}/pass/change`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify({ newPass: result })
  })

  if (status !== 200) return self.errorMessage('resetError')

  return {
    status: response.status,
    route,
    action,
    result: await response.json(),
    message: true,
    messageType: 'Change password',
    messageText: 'Password successfuly changed'
  }
}
