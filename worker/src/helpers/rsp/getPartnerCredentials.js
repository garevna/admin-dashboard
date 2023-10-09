import { getRecordByKey } from '../db'
import { encrypt } from '../crypto'

const [route, action] = ['rsp', 'credentials']

// const getUserDetailsError = {
//   error: true,
//   errorType: 'Patrner credentials',
//   errorMessage: 'Operation failed. It looks like partner does not exist'
// }

export const getPartnerCredentials = async function (partnerId) {
  const { status, result: partner } = await getRecordByKey('rsp', partnerId)

  if (status !== 200) return /* self.postMessage(Object.assign(getUserDetailsError, { status, route, action })) */

  const { login, password } = partner.userInfo

  return { status: 200, route, action, result: await encrypt(JSON.stringify({ login, password })) }
}
