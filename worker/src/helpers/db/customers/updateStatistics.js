import { openDB } from '../openDB'

import { getRecordByKey, putRecordByKey } from '../'

const [route, action] = ['statistics', 'update']

export const updateStatistics = async function (customerId, customerServices = []) {
  let errors = 0
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action, error: true, errorType: 'Open local DB', errorMessage: 'Failed to open DB. Try to refresh the page.' }

  for (const service of customerServices) {
    let { status, result: serviceStatistics } = await getRecordByKey('statistics', service.id)

    if (status !== 200) {
      const { status, result } = await getRecordByKey('services', service.id)
      if (status !== 200) {
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

      if (response.status !== 200) {
        continue
      }

      serviceStatistics = response.result
    }

    serviceStatistics.data.push({ customerId, status: service.status, modified: service.modified })
    await putRecordByKey('statistics', service.id, serviceStatistics)

    return { route, action, status: errors ? 409 : 200 }
  }
}
