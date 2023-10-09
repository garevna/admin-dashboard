const { openDB, putRecord, getServicesByStatus } = require('../')

const [route, action] = ['reports', 'calculate-partners-data']

module.exports = async function () {
  const { result } = await self.getResellersList()

  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports', 'partners'], 'readwrite')
  const [reportStore, partnerStore] = [
    transaction.objectStore('reports'),
    transaction.objectStore('partners')
  ]

  return new Promise((resolve) => {
    reportStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result

      if (cursor) {
        const record = cursor.value

        const { dynamic, /* pending, */ services /*, connections, charn */ } = record

        const partnerIdList = Array.from(new Set(dynamic.map(item => item.resellerId)))

        for (const partnerId of partnerIdList) {
          if (!result[partnerId]) {
            result[partnerId] = {
              connections: {},
              services: {},
              dynamic: [],
              pending: [],
              churn: {},
              MRR: {}
            }
          }

          const churn = {
            awaitingSuspension: getServicesByStatus(services, 'Awaiting to be suspended'),
            suspended: getServicesByStatus(services, 'Suspended'),
            awaitingCancelation: getServicesByStatus(services, 'Awaiting for cancelation'),
            canceled: getServicesByStatus(services, 'Canceled'),
            notConnected: getServicesByStatus(services, 'Not connected')
          }

          for (const key of ['awaitingSuspension', 'suspended', 'awaitingCancelation', 'canceled']) {
            for (const propName of ['total', 'lastMonth', 'currentMonth']) record.churn[key][propName] += churn[key][propName]
          }

          await putRecord(partnerStore, record)
        }
        cursor.continue()
      } else resolve({ status: 200, route, action, result: 'Partner\'s data stored' })
    }
  })
}
