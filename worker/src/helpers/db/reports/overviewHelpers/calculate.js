const { openDB } = require('../../openDB')
const { calculateReportRecord, putRecord } = require('../store')

const [route, action] = ['reports', 'calculate']

module.exports = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'reports', 'partners'], 'readwrite')

  const [serviceStore, partnerStore, reportStore, customerStore] = [
    transaction.objectStore('services'),
    transaction.objectStore('partners'),
    transaction.objectStore('reports'),
    transaction.objectStore('customers')
  ]

  const [calculateBuildingRecord, calculatePartnerRecord] = [
    calculateReportRecord.bind(null, customerStore.index('buildingId'), serviceStore),
    calculateReportRecord.bind(null, customerStore.index('resellerId'), serviceStore)
  ]

  reportStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result
    if (cursor) {
      calculateBuildingRecord(cursor.value)
        .then(record => putRecord(reportStore, record))
      cursor.continue()
    }
  }

  partnerStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result
    if (cursor) {
      calculatePartnerRecord(cursor.value)
        .then(record => putRecord(partnerStore, record))
      cursor.continue()
    }
  }

  return { status: 200, route, action }
}
