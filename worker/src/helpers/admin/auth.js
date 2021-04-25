import { encrypt, /* decrypt, */ hash } from '../crypto'
import { hostHandler, apiKeyHandler, credentialsHandler } from '../env'
import { authOffline, authError } from '../errors'

export const auth = async (login, password) => {
  if (!navigator.onLine) return authOffline()

  // self.postMessage({ status: 300, action: 'auth', login, password })

  const { status: hashStatus, result: hashResult } = hash(password)

  if (hashStatus !== 200) return authError(hashStatus)

  // self.postMessage({ status: 300, action: 'password hash', password, result: hashResult })

  const { status, result: encryptResult } = encrypt(JSON.stringify({ login, password: hashResult }))

  if (status !== 200) return authError(status)

  credentialsHandler(encryptResult)

  const response = await fetch(`${hostHandler()}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler()
    },
    body: JSON.stringify({ data: encryptResult })
  })

  const result = await response.json()

  self.postMessage({ status: 300, route: 'admin', action: 'credentials', result: credentialsHandler() })

  if (response.status !== 200) return authError(response.status, login)

  return {
    status: 200,
    route: 'admin',
    action: 'redirect',
    result,
    message: true,
    messageType: 'DGtek Admin authorization',
    messageText: `Role: ${result.data.role}`
  }
}
