import { encrypt, /* decrypt, */ hash } from '../crypto'
import { hostHandler, apiKeyHandler, credentialsHandler, roleHandler } from '../env'
import { access } from '../../configs'

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

  const role = result.data.role

  if (response.status !== 200 || role === 'RSP') {
    credentialsHandler('reset')
    return self.errorMessage('authError')
  }

  roleHandler(role)

  const test = role === 'SuperAdmin' || role === 'admin' || role === 'supervisor'

  Object.assign(access, {
    updates: test,
    messages: test,
    customers: test,
    buildings: test,
    services: test,
    tickets: test,
    schedule: test,
    settings: test
  })

  return {
    status: 200,
    route,
    action,
    result: Object.assign(result.data, { credentials: credentialsHandler() }),
    message: true,
    messageType: 'DGtek admin portal authorization',
    messageText: `Role: ${role}`
  }
}
