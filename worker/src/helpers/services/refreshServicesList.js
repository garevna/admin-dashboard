import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

const route = 'services'

export const refreshServicesList = async function () {
  const action = 'refresh'
  const response = await get('service')

  await clearStore('services')

  if (response.status !== 200) return self.errorMessage('refreshServicesListError')

  for (const service of response.result) {
    const { status } = await putRecordByKey('services', service._id, service)
    if (status !== 200) return self.errorMessage('refreshServicesListError')
  }

  return Object.assign(response, { route, action })
}
