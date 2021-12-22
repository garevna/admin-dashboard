import { encrypt, /* decrypt, */ hash } from '../crypto'
import { hostHandler, apiKeyHandler, credentialsHandler } from '../env'

export const auth = async (login, password) => {
  if (!navigator.onLine) self.errorMessage('authOffline')

  const { status: hashStatus, result: hashResult } = hash(password)

  if (hashStatus !== 200) return self.errorMessage('authError')

  const { status, result: encryptResult } = await encrypt(JSON.stringify({ login, password: hashResult }))

  if (status !== 200) return self.errorMessage('authError')

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

  if (response.status !== 200) return self.errorMessage('authError')

  return {
    status: 200,
    route: 'admin',
    action: 'redirect',
    result: Object.assign(result.data, { credentials: credentialsHandler() }),
    message: true,
    messageType: 'DGtek Admin authorization',
    messageText: `Role: ${result.data.role}`
  }
}
