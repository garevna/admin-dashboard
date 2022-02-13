import { getRecordByKey } from '../db'

const [route, action] = ['customers', 'services']

const serviceError = {
  status: 404,
  error: true,
  errorType: 'Customer services',
  errorMessage: 'Customer service was not found'
}

export const getCustomerServices = async function (customerId) {
  let { status, result: customer } = await getRecordByKey('customers', customerId)

  if (status !== 200) {
    const response = await self.refreshCustomer(customerId)
    status = response.status
    customer = response.result
  }

  for (const service of customer.services) {
    const { status, result } = await self.getServiceDetails(service.id)
    if (status !== 200) {
      self.postMessage(serviceError)
      continue
    }

    const { serviceType, serviceName, subscriptionFee, upstreamSpeed, downstreamSpeed, productType } = result
    Object.assign(service, {
      serviceType,
      serviceName,
      subscriptionFee,
      speed: `${upstreamSpeed}/${downstreamSpeed}`,
      productType
    })
  }

  return { status, route, action, key: customerId, result: customer.services }
}
