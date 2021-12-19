import { get } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['rsp', 'registration']

export const getRegistrationRequests = async () => {
  const { status, result } = await get('registration?per_page=100')
  if (status !== 200) return self.errorMessage('getRegistrationRequestsError')

  // self.postDebugMessage({ registrationRequests: result })

  const promises = result.map(user => putRecordByKey('rsp', user._id, user))
  /* const response = */ await Promise.all(promises)

  // self.postDebugMessage({ registrationLocalUpdates: response })

  return { status: 200, route, action, result }
}
