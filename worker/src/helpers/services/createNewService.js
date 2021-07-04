import { post } from '../AJAX'
import { serviceSchema } from '../../configs'

export const createNewService = async function (id, data) {
  const [route, action] = ['services', 'post']

  const service = Object.assign({}, serviceSchema, data)

  const { status, result } = await post('service', service)

  if (status !== 200) return self.errorMessage('postServiceDetailsError')

  self.refreshServicesList()

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
