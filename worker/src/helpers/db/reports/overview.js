import {
  openDB,

  generateDates,
  overviewTemplate,
  getPremises,
  createDynamic,
  calculateMRR,
  testCurrentMonth,
  initialValues
} from './'

const [route, action] = ['reports', 'overview']

export const overview = async function () {
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

  const [active, pending] = [[], []]

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        active.push(...record.active)
        pending.push(...record.pending)

        result.totalOnNetBuildings += 1

        result.newLeadIngsCurrentMonth += record.buildingConnectionDate ? testCurrentMonth({ date: record.buildingConnectionDate }) : 0

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
        const rawDates = Array.from(new Set(active.map(service => service.date)))
        const rightDates = rawDates.filter(date => Date.parse(date))
        const minDate = rightDates.sort()[0]

        const dates = generateDates(minDate)

        Object.assign(result, {
          dynamic: createDynamic(dates, active),
          residentialDynamic: createDynamic(dates, active.filter(item => item.serviceType === 'residential')),
          commercialDynamic: createDynamic(dates, active.filter(item => item.serviceType === 'commercial'))
        })

        const MRR = calculateMRR(active, pending)

        Object.assign(result, { MRR })

        resolve({ status: 200, route, action, result })
      }
    }
  })
}
