const {
  openDB,
  overviewTemplate,
  getPremises,
  calculateMRR,
  testCurrentMonth,
  initialValues,
  dynamics
} = require('./')

const [route, action] = ['reports', 'overview']

module.exports = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports'], 'readwrite')
  const store = transaction.objectStore('reports')

  const result = {
    totalOnNetBuildings: 0,
    newLeadIngsCurrentMonth: 0,
    premisesPassed: self.__clone(overviewTemplate.premisesPassed),
    connections: self.__clone(initialValues.connections),
    services: self.__clone(initialValues.services),
    awaitingSuspension: self.__clone(initialValues.churn.awaitingSuspension),
    suspended: self.__clone(initialValues.churn.suspended),
    awaitingCancelation: self.__clone(initialValues.churn.awaitingCancelation),
    canceled: self.__clone(initialValues.churn.canceled)
  }

  dynamics.init()
  const pending = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        result.totalOnNetBuildings += 1
        result.newLeadIngsCurrentMonth += record.buildingConnectionDate ? testCurrentMonth({ date: record.buildingConnectionDate }) : 0

        const { dynamic: recordDynamic, pending: recordPending } = record

        dynamics.reduce(recordDynamic)

        pending.push(...recordPending)

        const premisesPassed = getPremises(record)
        const { connections, services, churn } = record
        const { awaitingSuspension, suspended, awaitingCancelation, canceled } = churn
        const sections = { premisesPassed, connections, services, awaitingSuspension, suspended, awaitingCancelation, canceled }

        for (const section of Object.keys(sections)) {
          for (const key of Object.keys(sections[section])) {
            Object.assign(result[section], { [key]: result[section][key] + sections[section][key] })
          }
        }

        cursor.continue()
      } else {
        const { dynamic, residentialDynamic, commercialDynamic } = dynamics.get()

        Object.assign(result, { dynamic, residentialDynamic, commercialDynamic })

        const MRR = calculateMRR(dynamic, residentialDynamic, commercialDynamic, pending)

        Object.assign(result, { MRR })

        resolve({ status: 200, route, action, result })
      }
    }
  })
}
