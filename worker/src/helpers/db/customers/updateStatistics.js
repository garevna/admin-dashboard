import { openDB } from '../openDB'

import { getRecordByKey, putRecordByKey } from '../'

const [route, action] = ['statistics', 'update']

export const updateStatistics = async function (customerId, customerServices = []) {
  self.postDebugMessage({ action: 'updateStatistics', customerId, customerServices })
  let errors = 0
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action, error: true, errorType: 'Open local DB', errorMessage: 'Failed to open DB. Try to refresh the page.' }

  for (const service of customerServices) {
    self.postDebugMessage({ service })
    let { status, result: serviceStatistics } = await getRecordByKey('statistics', service.id)

    self.postDebugMessage({ response: { status, serviceStatistics } })

    if (status !== 200) {
      const { status, result } = await getRecordByKey('services', service.id)
      if (status !== 200) {
        self.postDebugMessage({ route, operation: `getRecordByKey ${service.id}`, response: { status, result } })
        errors++
        continue
      }
      const { serviceType, serviceName, subscriptionFee, upstreamSpeed, downstreamSpeed, productType } = result
      const response = await putRecordByKey('statistics', service.id, {
        commercial: serviceType === 'commercial',
        serviceName,
        productType,
        speed: Math.min(upstreamSpeed, downstreamSpeed),
        speedLiteral: `${upstreamSpeed}/${downstreamSpeed}`,
        subscriptionFee,
        data: []
      })

      self.postDebugMessage({ route, operation: `putRecordByKey ${service.id}`, response: { status: response.status, result: response.result } })

      if (response.status !== 200) {
        self.postDebugMessage({ route, operation: `putRecordByKey ${service.id}`, response: { status: response.status, result: response.result } })
        continue
      }

      serviceStatistics = response.result
    }

    serviceStatistics.data.push({ customerId, status: service.status, modified: service.modified })
    const response = await putRecordByKey('statistics', service.id, serviceStatistics)
    self.postDebugMessage({ route, response })

    return { route, action, status: errors ? 409 : 200 }
  }
}
