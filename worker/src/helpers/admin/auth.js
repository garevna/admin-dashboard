import { encrypt, /* decrypt, */ hash } from '../crypto'
import { hostHandler, apiKeyHandler, credentialsHandler } from '../env'

const { authOffline, authError } = require('../errors').default

export const auth = async (login, password) => {
  if (!navigator.onLine) return authOffline()

  const { status: hashStatus, result: hashResult } = hash(password)

  if (hashStatus !== 200) return authError(hashStatus)

  const { status, result: encryptResult } = await encrypt(JSON.stringify({ login, password: hashResult }))

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
