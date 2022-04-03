import { openDB } from '../openDB'

import { pendingConnectionStatusHandler } from '../../../data-handlers'

import { getDate, currentMonth, lastMonth } from './'

const [route, action] = ['reports', 'calculate']

export const calculate = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'reports'], 'readwrite')
  const [customerStore, serviceStore, reportStore] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('reports')
  ]

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        const { buildingId, services } = customer

        const activeServices = services.filter(item => item.status === 'Active')
        const pendingServices = services.filter(item => pendingConnectionStatusHandler().admin.includes(item.status))

        if (Array.isArray(services) && services.length > 0) {
          Object.assign(reportStore.get(buildingId), {
            onsuccess: event => {
              const record = event.target.result

              if (!record) return

              Object.assign(record, {
                activeConnections: record.activeConnections + (activeServices.length ? 1 : 0),
                pendingConnections: record.pendingConnections + (pendingServices.length ? 1 : 0),
                activeServices: record.activeServices + activeServices.length,
                pendingServices: record.pendingServices + pendingServices.length,
                newActiveConnectionsLastMoth: record.newActiveConnectionsLastMoth + activeServices.filter(item => lastMonth(item)).length > 0,
                newActiveConnectionsCurrentMoth: record.newActiveConnectionsCurrentMoth + activeServices.filter(item => currentMonth(item)).length > 0
              })

              !record.active && Object.assign(record, { active: {} })
              !record.pending && Object.assign(record, { pending: {} })

              const active = activeServices
                .map(service => ({ serviceId: service.id, activationDate: getDate(service) }))

              for (const service of active) {
                const activationDate = getDate(service)

                Object.assign(serviceStore.get(service.serviceId), {
                  onsuccess: ev => {
                    const { subscriptionFee } = ev.target.result
                    const sum = record.active[activationDate] ? record.active[activationDate] + subscriptionFee : subscriptionFee

                    Object.assign(record.active, { [activationDate]: sum })

                    Object.assign(reportStore.put(record), {
                      onsuccess: evnt => self.postDebugMessage({ record })
                    })
                  },
                  onerror: ev => self.postDebugMessage({ serviceError: ev.target.error })
                })
              }
            },
            onerror: event => self.postDebugMessage({ reportRecordAbsent: event.target.error })
          })
        }
        cursor.continue()
      } else {
        resolve({ status: 200, route, action })
      }
    }
  })
}
