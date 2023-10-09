const { openDB } = require('../../openDB')
const { calculateMRR } = require('../overviewHelpers')
const { dynamics } = require('../lib')

const [route, action] = ['reports', 'partners']

module.exports = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction('partners', 'readonly')
  const store = transaction.objectStore('partners')

  const result = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        const { _id: partnerId, connections, services, churn, pending } = record
        const { awaitingSuspension, suspended, awaitingCancelation, canceled } = churn

        dynamics.init()
        dynamics.reduce(record.dynamic)

        const { dynamic, residentialDynamic, commercialDynamic } = dynamics.get()

        const MRR = calculateMRR(dynamic, residentialDynamic, commercialDynamic, pending)

        result.push(Object.assign({}, {
          partnerId,
          name: record.name,
          connections,
          services,
          awaitingSuspension,
          suspended,
          awaitingCancelation,
          canceled,
          MRR
        }))

        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
