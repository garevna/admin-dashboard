import { refreshServicesList } from './'
import { post } from '../AJAX'
import { postServiceDetailsError } from '../error-handlers'
import { serviceSchema } from '../../configs'

export const createNewService = async function (id, data) {
  const [route, action] = ['services', 'post']

  const service = Object.assign({}, serviceSchema, data)

  // self.postMessage({ status: 300, route, action, sourceData: service })

  const { status, result } = await post('service', service)

  // self.postMessage({ status: 300, route, action, result })

  if (status !== 200) return postServiceDetailsError(status)

  refreshServicesList()

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Create new service',
    messageText: `New service ${service.serviceName} succesfully created`
  }
}
