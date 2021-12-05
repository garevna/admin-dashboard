import { estimatedServiceDeliveryTimeHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'estimatedServiceDeliveryTime']

export const getEstimatedServiceDeliveryTime = (key) => {
  const data = estimatedServiceDeliveryTimeHandler()

  if (!key) return { status: 200, route, action, section, result: data }

  if (data[key]) return { status: 200, route, action, section, key, result: Object.assign({}, data[key], { estimatedServiceDeliveryTime: data[key].value }) }

  for (const propName in data) {
    if (data[propName].synonyms.includes(key)) {
      return {
        status: 200,
        route,
        action,
        section,
        key,
        result: {
          toDisplay: data[propName].toDisplay,
          estimatedServiceDeliveryTime: data[propName].value,
          newCustomerDisabled: data[propName].newCustomerDisabled,
          buildingStatus: data[propName].buildingStatus
        }
      }
    }
  }

  return {
    status: 404,
    route,
    action,
    section,
    key,
    result: null,
    error: true,
    errorType: 'Invalid building status value',
    errorMessage: `Building status ${key} is invalid`
  }
}
