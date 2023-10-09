import { serviceParamsHandler } from './helpers/serviceParamsHandler'

const [route, action] = ['services', 'filters']

export const getServiceFilters = async function (id) {
  return {
    status: 200,
    route,
    action,
    result: {
      priceList: serviceParamsHandler.getPriceList(),
      speedList: serviceParamsHandler.getSpeedList(),
      discountList: serviceParamsHandler.getDiscountList(),
      termsList: serviceParamsHandler.getTermsList()
    }
  }
}
