import { encrypt, /* decrypt, */ hash } from '../crypto'
import { hostHandler, apiKeyHandler, credentialsHandler, roleHandler } from '../env'

const [route, action] = ['admin', 'redirect']

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

  if (response.status !== 200) {
    credentialsHandler('reset')
    return self.errorMessage('authError')
  }

  roleHandler(result.data.role)

  self.access = {
    updates: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor',
    messages: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor',
    customers: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor',
    buildings: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor',
    services: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor',
    tickets: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor',
    schedule: result.data.role === 'SuperAdmin' || result.data.role === 'admin' || result.data.role === 'supervisor'
  }

  return {
    status: 200,
    route,
    action,
    result: Object.assign(result.data, { credentials: credentialsHandler() }),
    message: true,
    messageType: 'DGtek admin portal authorization',
    messageText: `Role: ${result.data.role}`
  }
}
