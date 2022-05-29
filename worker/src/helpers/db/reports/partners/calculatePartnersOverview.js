import {
  openDB,
  calculateMRR
} from '../'

const [route, action] = ['reports', 'partners']

export const calculatePartnersOverview = async function () {
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

        const { _id: partnerId, connections, services, churn, active, pending } = record
        const { awaitingSuspension, suspended, awaitingCancelation, canceled } = churn

        const MRR = calculateMRR(active, pending)

        result.push(Object.assign({}, { partnerId, name: record.name, connections, services, awaitingSuspension, suspended, awaitingCancelation, canceled, MRR }))

        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
