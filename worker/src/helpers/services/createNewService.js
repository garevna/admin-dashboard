import { post } from '../AJAX'
import { putRecordByKey } from '../db'
import { serviceSchema } from '../../configs'

export const createNewService = async function (data) {
  const [route, action] = ['services', 'post']

  const service = Object.assign({}, serviceSchema, data)

  const { status, result } = await post('service', service)

  self.postDebugMessage({ response: { status, serviceId: result.data } })

  if (status !== 200) return self.errorMessage('postServiceDetailsError')

  if ((await putRecordByKey('services', result.data, Object.assign(service, { _id: result.data }))).status !== 200) self.errorMessage('postServiceDetailsLocalError')

  self.refreshServicesList()

  return {
    status,
    route,
    action,
    result: service,
    message: true,
    messageType: 'Create new service',
    messageText: `New service ${service.serviceName} succesfully created`
  }
}
