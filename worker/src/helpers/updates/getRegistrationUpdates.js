import { get } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['updates', 'registration']

export const getRegistrationUpdates = async () => {
  const { status, result } = await get('registration?per_page=50')
  if (status !== 200) return self.errorMessage('remoteServerError', 500, 'updates', 'registration')

  const promises = result.map(user => putRecordByKey('rsp', user._id, user))
  await Promise.all(promises)

  return { status: 200, route, action, result }
}
