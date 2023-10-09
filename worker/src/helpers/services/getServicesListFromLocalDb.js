import { getAllRecords } from '../db'
import { serviceParamsHandler } from './helpers/serviceParamsHandler'
import { getDiscountAsText } from './helpers/getDiscountAsText'

export const getServicesListFromLocalDb = async function () {
  const { status, result } = await getAllRecords('services')

  const [termsList, speedList, priceList, discountList] = [[], [], [], [], []]

  result.forEach(service => {
    termsList.push(service.contractTerm)
    speedList.push(`${service.downstreamSpeed}/${service.upstreamSpeed} Mbps`)
    priceList.push(service.subscriptionFee)
    discountList.push(getDiscountAsText(service))
  })

  serviceParamsHandler.setPriceList(Array.from(new Set(priceList)).sort())
  serviceParamsHandler.setSpeedList(Array.from(new Set(speedList)).sort())
  serviceParamsHandler.setTermsList(Array.from(new Set(termsList)).sort())
  serviceParamsHandler.setDiscountList(Array.from(new Set(discountList)).sort())

  return status !== 200 ? self.errorMessage('getServicesListError') : ({ status, route: 'services', action: 'list', result })
}
