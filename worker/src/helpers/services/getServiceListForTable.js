import { getRealMRR } from './helpers/getRealMRR'
import { getDiscountAsText } from './helpers/getDiscountAsText'

const [route, action] = ['services', 'table']

export const getServiceListForTable = async function () {
  const { status, result } = await self.getServicesListFromLocalDb()

  const response = result.map(service => ({
    name: service.serviceName,
    type: service.serviceType,
    speed: `${service.downstreamSpeed}/${service.upstreamSpeed} Mbps`,
    productType: service.productType,
    contractTerm: service.contractTerm,
    MRC: service.subscriptionFee,
    discount: getDiscountAsText(service),
    realMRR: getRealMRR(service),
    gstIncEx: service.gstIncEx,
    connectionFee: service.connectionFee,
    freeTrial: service.freeTrial,
    legacy: !!service.legacy,
    _id: service._id
  }))

  return status !== 200
    ? self.errorMessage('getServicesListError')
    : ({ status, route, action, result: response })
}
