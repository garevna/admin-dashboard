import { openDB } from '../openDB'

import { getRecordByKey, putRecordByKey } from '../'

const [route, action] = ['statistics', 'update']

export const createStatisticRecord = async function (customerId, customerServices) {
  let errors = 0
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action, error: true, errorType: 'Open local DB', errorMessage: 'Failed to open DB. Try to refresh the page.' }

  for (const service of customerServices) {
    let { status, result: serviceStatistics } = await getRecordByKey('statistics', service._id)

    self.postDebugMessage({ response: { status, serviceStatistics } })

    if (status !== 200) {
      const { status, result } = await getRecordByKey('services', service._id)
      if (status !== 200) {
        self.postDebugMessage({ route, operation: `getRecordByKey ${service._id}`, response: { status, result } })
        errors++
        continue
      }
      const { serviceType, serviceName, subscriptionFee, upstreamSpeed, downstreamSpeed, productType } = result
      const response = await putRecordByKey('statistics', service._id, {
        commercial: serviceType === 'commercial',
        serviceName,
        productType,
        speed: Math.min(upstreamSpeed, downstreamSpeed),
        speedLiteral: `${upstreamSpeed}/${downstreamSpeed}`,
        subscriptionFee,
        customers: []
      })

      self.postDebugMessage({ route, operation: `putRecordByKey ${service._id}`, response: { status: response.status, result: response.result } })

      if (response.status !== 200) {
        // self.postDebugMessage({ route, operation: `putRecordByKey ${service._id}`, response: { status: response.status, result: response.result } })
        continue
      }

      serviceStatistics = response.result
    }

    serviceStatistics.customers.push({ [service.customerId]: service.status })
    const response = await putRecordByKey('statistics', service._id, serviceStatistics)
    self.postDebugMessage({ route, response })

    return { route, action, status: errors ? 409 : 200 }
  }
}
